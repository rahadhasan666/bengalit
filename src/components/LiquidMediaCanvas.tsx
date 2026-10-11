import React, { useEffect, useRef } from 'react';

interface LiquidMediaCanvasProps {
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const LiquidMediaCanvas: React.FC<LiquidMediaCanvasProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

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

    // Fragment Shader: Liquid water ripple with chromatic dispersion & refraction
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_intensity;

      void main() {
        vec2 p = v_uv;
        
        // Distance to pointer
        vec2 toMouse = p - u_mouse;
        float dist = length(toMouse);

        // Ripple wave equation
        float wave = sin(dist * 35.0 - u_time * 4.5) * exp(-dist * 4.0) * u_intensity;
        vec2 offset = normalize(toMouse + 0.0001) * wave * 0.035;

        // Chromatic dispersion (RGB split on ripples)
        vec2 uvR = p + offset * 1.05;
        vec2 uvG = p + offset * 1.0;
        vec2 uvB = p + offset * 0.95;

        // Base gradient colors (Ink black / dark slate with subtle vermilion refraction)
        float r = 0.05 + 0.9 * smoothstep(0.0, 1.0, uvR.x * uvR.y + wave * 0.5);
        float g = 0.05 + 0.1 * smoothstep(0.0, 1.0, uvG.x);
        float b = 0.06 + 0.12 * smoothstep(0.0, 1.0, uvB.y);

        // Add specular highlight on wave crest
        float specular = pow(max(0.0, wave * 15.0), 3.0) * 0.45;

        gl_FragColor = vec4(r + specular, g + specular * 0.6, b + specular * 0.6, 0.45);
      }
    `;

    // Compile shaders
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uIntensityLoc = gl.getUniformLocation(program, 'u_intensity');

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetIntensity = 0.0;
    let currentIntensity = 0.0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      targetIntensity = 1.0;
    };

    const handlePointerLeave = () => {
      targetIntensity = 0.0;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handlePointerMove);
      parent.addEventListener('mouseleave', handlePointerLeave);
    }

    let frameId: number;
    const startTime = performance.now();

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth * 0.75;
      canvas.height = canvas.clientHeight * 0.75;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;
      currentIntensity += (targetIntensity - currentIntensity) * 0.05;

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, mouseX, mouseY);
      gl.uniform1f(uIntensityLoc, currentIntensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handlePointerMove);
        parent.removeEventListener('mouseleave', handlePointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay ${className}`}
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};

export default LiquidMediaCanvas;
