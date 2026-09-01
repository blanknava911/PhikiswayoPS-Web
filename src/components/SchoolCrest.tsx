import React from 'react';
import { publicAssetPath } from '../utils/assets';

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
  const logoSize = Math.round(size);
  const fullLogoHeight = Math.round(size * 1.08);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={publicAssetPath('school-logo.png')}
        alt="Phikiswayo Primary School logo"
        width={logoSize}
        height={variant === 'full' ? fullLogoHeight : logoSize}
        className="shrink-0 object-contain"
        style={{
          width: logoSize,
          height: variant === 'full' ? fullLogoHeight : logoSize,
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
