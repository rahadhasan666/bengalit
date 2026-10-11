import React, { useEffect, useRef, useState, useCallback } from 'react';

interface WaterDistortionImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export const WaterDistortionImage: React.FC<WaterDistortionImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[16/10]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  // References for WebGL resources to persist across renders without recreation
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const posBufferRef = useRef<WebGLBuffer | null>(null);
  const vsRef = useRef<WebGLShader | null>(null);
  const fsRef = useRef<WebGLShader | null>(null);

  // Uniform locations
  const uniformsRef = useRef<{
    uTexture: WebGLUniformLocation | null;
    uMouse: WebGLUniformLocation | null;
    uPrevMouse: WebGLUniformLocation | null;
    uTime: WebGLUniformLocation | null;
    uHover: WebGLUniformLocation | null;
    uResolution: WebGLUniformLocation | null;
    uImageResolution: WebGLUniformLocation | null;
  }>({
    uTexture: null,
    uMouse: null,
    uPrevMouse: null,
    uTime: null,
    uHover: null,
    uResolution: null,
    uImageResolution: null,
  });

  // Smooth mouse and animation state
  const isHoveredRef = useRef(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const hoverIntensityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef(performance.now());
  const isRunningRef = useRef(false);

  // Vertex Shader
  const vsSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = (a_position + 1.0) * 0.5;
      v_uv.y = 1.0 - v_uv.y;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Fragment Shader: High-precision liquid ripple with chromatic dispersion
  // Safe bounds prevent any white blowout or color saturation spikes
  const fsSource = `
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform vec2 u_prev_mouse;
    uniform float u_time;
    uniform float u_hover;
    uniform vec2 u_resolution;
    uniform vec2 u_image_resolution;

    void main() {
      vec2 st = v_uv;
      float screenRatio = u_resolution.x / max(u_resolution.y, 1.0);
      float imageRatio = u_image_resolution.x / max(u_image_resolution.y, 1.0);
      
      vec2 newUV = st;
      if (screenRatio > imageRatio) {
        float scale = screenRatio / imageRatio;
        newUV.y = (st.y - 0.5) / scale + 0.5;
      } else {
        float scale = imageRatio / screenRatio;
        newUV.x = (st.x - 0.5) / scale + 0.5;
      }

      // Distance & vector to mouse pointer
      vec2 toMouse = newUV - u_mouse;
      float dist = length(toMouse);

      // Liquid concentric sinusoidal ripples
      float wave = sin(dist * 26.0 - u_time * 5.0) * exp(-dist * 4.2) * u_hover;

      // Trailing wake from mouse motion velocity
      vec2 mouseVelocity = u_mouse - u_prev_mouse;
      float speed = clamp(length(mouseVelocity) * 14.0, 0.0, 1.0);
      float wake = sin(dist * 16.0 - u_time * 3.2) * exp(-dist * 3.5) * speed * u_hover;

      // Strictly bounded total displacement (guaranteed never to distort out of bounds)
      float totalDisp = clamp(wave * 0.034 + wake * 0.022, -0.045, 0.045);
      vec2 dispDir = (dist > 0.0001) ? normalize(toMouse) : vec2(0.0, 1.0);
      vec2 distortedUV = clamp(newUV + dispDir * totalDisp, 0.002, 0.998);

      // Authentic Junca Studio Chromatic Dispersion (RGB split refraction)
      vec2 chromOffset = dispDir * totalDisp * 0.42;
      float r = texture2D(u_texture, clamp(distortedUV + chromOffset, 0.002, 0.998)).r;
      float g = texture2D(u_texture, distortedUV).g;
      float b = texture2D(u_texture, clamp(distortedUV - chromOffset, 0.002, 0.998)).b;

      // Subtle specular water reflection (safely clamped so it CANNOT blow out to white)
      float sheen = clamp(totalDisp * 2.8, -0.05, 0.12);
      vec3 col = clamp(vec3(r, g, b) + vec3(sheen * 0.5, sheen * 0.8, sheen), 0.0, 1.0);

      gl_FragColor = vec4(col, u_hover);
    }
  `;

  // Render loop
  const renderFrame = useCallback((now: number) => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    const program = programRef.current;
    const texture = textureRef.current;
    const uniforms = uniformsRef.current;
    const img = imgRef.current;

    if (!gl || !canvas || !program || !texture || !img || !gl.isProgram(program)) {
      isRunningRef.current = false;
      return;
    }

    const elapsed = (now - startTimeRef.current) / 1000;

    // Smooth mouse coordinates with inertia
    prevMouseRef.current.x = mouseRef.current.x;
    prevMouseRef.current.y = mouseRef.current.y;
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.14;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.14;

    // Hover intensity interpolation
    const targetHover = isHoveredRef.current ? 1.0 : 0.0;
    hoverIntensityRef.current += (targetHover - hoverIntensityRef.current) * 0.12;

    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    if (uniforms.uTexture) gl.uniform1i(uniforms.uTexture, 0);
    if (uniforms.uResolution) gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    if (uniforms.uImageResolution) {
      const iw = img.naturalWidth || 800;
      const ih = img.naturalHeight || 600;
      gl.uniform2f(uniforms.uImageResolution, iw, ih);
    }
    if (uniforms.uMouse) gl.uniform2f(uniforms.uMouse, mouseRef.current.x, mouseRef.current.y);
    if (uniforms.uPrevMouse) gl.uniform2f(uniforms.uPrevMouse, prevMouseRef.current.x, prevMouseRef.current.y);
    if (uniforms.uTime) gl.uniform1f(uniforms.uTime, elapsed);
    if (uniforms.uHover) gl.uniform1f(uniforms.uHover, hoverIntensityRef.current);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Keep running as long as hovered or fading out
    if (isHoveredRef.current || hoverIntensityRef.current > 0.005) {
      animFrameRef.current = requestAnimationFrame(renderFrame);
    } else {
      isRunningRef.current = false;
      hoverIntensityRef.current = 0;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!isRunningRef.current && webglReady && !contextLost) {
      isRunningRef.current = true;
      startTimeRef.current = performance.now();
      animFrameRef.current = requestAnimationFrame(renderFrame);
    }
  }, [webglReady, contextLost, renderFrame]);

  // Initialize WebGL once
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imgRef.current;
    if (!canvas || !container || !img || !img.complete || img.naturalWidth === 0) return;

    // If already initialized, just update texture
    if (glRef.current && programRef.current) {
      return;
    }

    try {
      const gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      });

      if (!gl) {
        setWebglReady(false);
        return;
      }

      glRef.current = gl;

      // Handle context lost
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        setContextLost(true);
        setWebglReady(false);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
      canvas.addEventListener('webglcontextlost', handleContextLost, false);

      // Create Shaders
      const createShader = (type: number, srcCode: string) => {
        const s = gl.createShader(type);
        if (!s) return null;
        gl.shaderSource(s, srcCode);
        gl.compileShader(s);
        return s;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return;
      vsRef.current = vs;
      fsRef.current = fs;

      const prog = gl.createProgram();
      if (!prog) return;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);

      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        return;
      }

      programRef.current = prog;
      gl.useProgram(prog);

      // Geometry quad buffer
      const buf = gl.createBuffer();
      posBufferRef.current = buf;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const aPos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      // Cache uniforms
      uniformsRef.current = {
        uTexture: gl.getUniformLocation(prog, 'u_texture'),
        uMouse: gl.getUniformLocation(prog, 'u_mouse'),
        uPrevMouse: gl.getUniformLocation(prog, 'u_prev_mouse'),
        uTime: gl.getUniformLocation(prog, 'u_time'),
        uHover: gl.getUniformLocation(prog, 'u_hover'),
        uResolution: gl.getUniformLocation(prog, 'u_resolution'),
        uImageResolution: gl.getUniformLocation(prog, 'u_image_resolution'),
      };

      // Upload Texture
      const tex = gl.createTexture();
      textureRef.current = tex;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      // Set canvas size
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(300, Math.floor(rect.width * dpr));
      canvas.height = Math.max(200, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);

      setWebglReady(true);
    } catch {
      setWebglReady(false);
    }
  }, [vsSource, fsSource]);

  // Mount effect: setup resize observer and initialize
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const gl = glRef.current;
      if (!gl || !canvas) return;
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
      }
    });

    resizeObserver.observe(container);

    const img = imgRef.current;
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        initWebGL();
      } else {
        img.onload = () => initWebGL();
      }
    }

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const gl = glRef.current;
      if (gl) {
        try {
          if (textureRef.current) gl.deleteTexture(textureRef.current);
          if (posBufferRef.current) gl.deleteBuffer(posBufferRef.current);
          if (programRef.current) gl.deleteProgram(programRef.current);
          if (vsRef.current) gl.deleteShader(vsRef.current);
          if (fsRef.current) gl.deleteShader(fsRef.current);
        } catch {
          // ignore cleanup errors on unmount
        }
      }
      glRef.current = null;
      programRef.current = null;
    };
  }, [initWebGL]);

  // Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    targetMouseRef.current = { x, y };

    if (!isRunningRef.current) {
      startAnimation();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      targetMouseRef.current = { x, y };
      mouseRef.current = { x, y };
      prevMouseRef.current = { x, y };
    }
    isHoveredRef.current = true;
    setIsHovered(true);
    startAnimation();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden select-none cursor-pointer group bg-[#080c10] ${aspectRatio} ${className}`}
    >
      {/* 
        CRITICAL ARCHITECTURAL GUARANTEE:
        The native HTML img element is ALWAYS rendered with opacity-100!
        It NEVER disappears, NEVER turns white, and displays instantaneously.
      */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        loading="lazy"
        crossOrigin="anonymous"
      />

      {/* 
        WebGL Real-Time Water Distortion Canvas 
        - Always in DOM, no recreate/destroy cycles
        - Opacity smoothly tracks hover state
        - Pauses requestAnimationFrame when unhovered (0% GPU)
      */}
      {!contextLost && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block pointer-events-none z-10 transition-opacity duration-300 ${
            isHovered && webglReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle Specular Sheen Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5 pointer-events-none z-20 opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default WaterDistortionImage;
