import React from 'react';

interface JuncaCTAProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'light' | 'dark' | 'ink' | 'red' | 'default';
  className?: string;
  type?: 'button' | 'submit';
  width?: string;
  external?: boolean;
}

export const JuncaCTA: React.FC<JuncaCTAProps> = ({
  label,
  href,
  onClick,
  variant = 'light',
  className = '',
  type = 'button',
  width,
  external,
}) => {
  const variantClass =
    variant === 'dark'
      ? 'cta--dark'
      : variant === 'ink'
      ? 'cta--ink'
      : variant === 'red'
      ? 'cta--red'
      : '';

  const style: React.CSSProperties = width
    ? { ['--cta-w' as string]: width, width: `min(${width}, 100%)`, maxWidth: '100%' }
    : { maxWidth: '100%' };

  const content = (
    <>
      <span className="cta__text">
        <span className="cta__label">{label}</span>
        <span className="cta__label cta__label--hover" aria-hidden="true">
          {label}
        </span>
      </span>
      <svg
        className="cta__arrow"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`cta ${variantClass} ${className}`}
        style={style}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`cta ${variantClass} ${className}`}
      style={style}
    >
      {content}
    </button>
  );
};

export default JuncaCTA;

