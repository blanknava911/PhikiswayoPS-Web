import React from 'react';

interface SchoolCrestProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'shield' | 'full';
}

export const SchoolCrest: React.FC<SchoolCrestProps> = ({
  className = "",
  size = 48,
  showText = false,
  variant = 'shield'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/school-logo.png"
        alt="Phikiswayo Primary School logo"
        width={variant === 'full' ? size : size}
        height={variant === 'full' ? Math.round(size * 1.1) : size}
        className="shrink-0 object-contain drop-shadow-sm"
        style={{
          width: variant === 'full' ? size : size,
          height: variant === 'full' ? Math.round(size * 1.1) : size,
        }}
      />

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-bold text-lg leading-tight tracking-tight text-neutral-900 font-display">
            Phikiswayo
          </span>
          <span className="text-xs uppercase tracking-wider text-[#ff2121] font-bold">
            Strive for Success • Ntuzuma
          </span>
        </div>
      )}
    </div>
  );
};
