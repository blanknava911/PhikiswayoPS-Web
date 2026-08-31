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
  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center justify-center ${className}`}>
        <svg
          width={size}
          height={size * 1.2}
          viewBox="0 0 300 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-md"
        >
          {/* School Name Heading */}
          <text
            x="150"
            y="34"
            textAnchor="middle"
            fill="#111111"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="28"
            fontWeight="900"
            letterSpacing="2.5"
          >
            PHIKISWAYO
          </text>
          <text
            x="150"
            y="62"
            textAnchor="middle"
            fill="#222222"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="3.5"
          >
            PRIMARY SCHOOL
          </text>

          {/* Shield Group */}
          <g id="shield-full">
            {/* Outer Shield Silhouette (Black Border) */}
            <path
              d="M 150 82 Q 205 97, 262 102 Q 256 182, 238 226 Q 206 278, 150 312 Q 94 278, 62 226 Q 44 182, 38 102 Q 95 97, 150 82 Z"
              fill="#000000"
            />

            {/* Inner Red Shield Face */}
            <path
              d="M 150 90 Q 202 104, 252 108 Q 246 180, 230 220 Q 200 268, 150 299 Q 100 268, 70 220 Q 54 180, 48 108 Q 98 104, 150 90 Z"
              fill="#ff2121"
            />

            {/* Black T-Divider Bars */}
            <path
              d="M 44 165 L 256 165 L 256 180 L 44 180 Z"
              fill="#000000"
            />
            <path
              d="M 143 180 L 157 180 L 157 302 L 143 302 Z"
              fill="#000000"
            />

            {/* Top Section: Open Book */}
            <g id="open-book-full" transform="translate(150, 134)">
              <path
                d="M -3 0 C -18 -8 -38 -5 -50 2 L -50 28 C -38 21 -18 20 -3 27 Z"
                fill="#000000"
              />
              <path
                d="M -5 3 C -19 -4 -36 -2 -46 3 L -46 25 C -36 19 -19 18 -5 24 Z"
                fill="#ffffff"
              />
              <path d="M -40 8 C -30 4 -20 4 -12 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M -40 13 C -30 9 -20 9 -12 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M -40 18 C -30 14 -20 14 -12 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />

              <path
                d="M 3 0 C 18 -8 38 -5 50 2 L 50 28 C 38 21 18 20 3 27 Z"
                fill="#000000"
              />
              <path
                d="M 5 3 C 19 -4 36 -2 46 3 L 46 25 C 36 19 19 18 5 24 Z"
                fill="#ffffff"
              />
              <path d="M 12 7 C 20 4 30 4 40 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 12 12 C 20 9 30 9 40 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 12 17 C 20 14 30 14 40 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />

              <path d="M 0 -2 L 0 28" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Bottom Left Section: Lit Candle in Candleholder */}
            <g id="candle-full" transform="translate(100, 238)">
              <ellipse cx="0" cy="18" rx="20" ry="4.5" fill="#000000" />
              <ellipse cx="0" cy="17" rx="17" ry="3" fill="#ff2121" />
              <circle cx="-19" cy="13" r="6" stroke="#000000" strokeWidth="2.5" fill="none" />
              <path d="M -13 14 L -8 16" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
              <path d="M -5 16 L 5 16 L 4 12 L -4 12 Z" fill="#000000" />
              <path d="M -3 12 L 3 12 L 3 10 L -3 10 Z" fill="#000000" />
              <rect x="-3.5" y="-12" width="7" height="22" fill="#000000" rx="1" />
              <path d="M 0 -12 L 0 -16" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
              <path
                d="M 0 -28 C -4 -21 -4 -17 0 -15 C 4 -17 4 -21 0 -28 Z"
                fill="#000000"
              />
            </g>

            {/* Bottom Right Section: Graduation Cap */}
            <g id="graduation-cap-full" transform="translate(198, 236)">
              <path
                d="M -16 6 L -16 15 C -16 21 16 21 16 15 L 16 6 Z"
                fill="#000000"
              />
              <path d="M -16 7 C -16 11 16 11 16 7" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.4" />
              <polygon
                points="0,-12 30,0 0,12 -30,0"
                fill="#000000"
                stroke="#000000"
                strokeWidth="1"
              />
              <polygon
                points="0,-10 26,0 0,10 -26,0"
                fill="#1a1a1a"
              />
              <circle cx="0" cy="0" r="2.5" fill="#000000" />
              <path
                d="M 0 0 C -12 2 -22 6 -24 14"
                stroke="#000000"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <polygon
                points="-24,14 -21,24 -27,24"
                fill="#000000"
              />
            </g>
          </g>

          {/* Bottom Ribbon: STRIVE FOR SUCCESS */}
          <g id="ribbon-full" transform="translate(0, 10)">
            <path
              d="M 75 295 L 45 285 L 56 300 L 42 318 L 76 312 Z"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 225 295 L 255 285 L 244 300 L 258 318 L 224 312 Z"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M 66 302 Q 150 334, 234 302 L 238 322 Q 150 354, 62 322 Z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="1.5"
            />
            <text
              x="150"
              y="323"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="'Arial Black', Impact, sans-serif"
              fontSize="8.5"
              fontWeight="900"
              letterSpacing="1.2"
            >
              STRIVE FOR SUCCESS
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Standard Compact Shield View (for header, badges, compact slots)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size * 1.15}
        viewBox="30 70 240 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        {/* Shield Group */}
        <g id="shield-compact">
          {/* Outer Shield Silhouette (Black Border) */}
          <path
            d="M 150 82 Q 205 97, 262 102 Q 256 182, 238 226 Q 206 278, 150 312 Q 94 278, 62 226 Q 44 182, 38 102 Q 95 97, 150 82 Z"
            fill="#000000"
          />

          {/* Inner Red Shield Face */}
          <path
            d="M 150 90 Q 202 104, 252 108 Q 246 180, 230 220 Q 200 268, 150 299 Q 100 268, 70 220 Q 54 180, 48 108 Q 98 104, 150 90 Z"
            fill="#ff2121"
          />

          {/* Black T-Divider Bars */}
          <path
            d="M 44 165 L 256 165 L 256 180 L 44 180 Z"
            fill="#000000"
          />
          <path
            d="M 143 180 L 157 180 L 157 302 L 143 302 Z"
            fill="#000000"
          />

          {/* Top Section: Open Book */}
          <g id="open-book-compact" transform="translate(150, 134)">
            <path
              d="M -3 0 C -18 -8 -38 -5 -50 2 L -50 28 C -38 21 -18 20 -3 27 Z"
              fill="#000000"
            />
            <path
              d="M -5 3 C -19 -4 -36 -2 -46 3 L -46 25 C -36 19 -19 18 -5 24 Z"
              fill="#ffffff"
            />
            <path d="M -40 8 C -30 4 -20 4 -12 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M -40 13 C -30 9 -20 9 -12 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M -40 18 C -30 14 -20 14 -12 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />

            <path
              d="M 3 0 C 18 -8 38 -5 50 2 L 50 28 C 38 21 18 20 3 27 Z"
              fill="#000000"
            />
            <path
              d="M 5 3 C 19 -4 36 -2 46 3 L 46 25 C 36 19 19 18 5 24 Z"
              fill="#ffffff"
            />
            <path d="M 12 7 C 20 4 30 4 40 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 12 12 C 20 9 30 9 40 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 12 17 C 20 14 30 14 40 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />

            <path d="M 0 -2 L 0 28" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Bottom Left Section: Lit Candle in Candleholder */}
          <g id="candle-compact" transform="translate(100, 238)">
            <ellipse cx="0" cy="18" rx="20" ry="4.5" fill="#000000" />
            <ellipse cx="0" cy="17" rx="17" ry="3" fill="#ff2121" />
            <circle cx="-19" cy="13" r="6" stroke="#000000" strokeWidth="2.5" fill="none" />
            <path d="M -13 14 L -8 16" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
            <path d="M -5 16 L 5 16 L 4 12 L -4 12 Z" fill="#000000" />
            <path d="M -3 12 L 3 12 L 3 10 L -3 10 Z" fill="#000000" />
            <rect x="-3.5" y="-12" width="7" height="22" fill="#000000" rx="1" />
            <path d="M 0 -12 L 0 -16" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
            <path
              d="M 0 -28 C -4 -21 -4 -17 0 -15 C 4 -17 4 -21 0 -28 Z"
              fill="#000000"
            />
          </g>

          {/* Bottom Right Section: Graduation Cap */}
          <g id="graduation-cap-compact" transform="translate(198, 236)">
            <path
              d="M -16 6 L -16 15 C -16 21 16 21 16 15 L 16 6 Z"
              fill="#000000"
            />
            <path d="M -16 7 C -16 11 16 11 16 7" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.4" />
            <polygon
              points="0,-12 30,0 0,12 -30,0"
              fill="#000000"
              stroke="#000000"
              strokeWidth="1"
            />
            <polygon
              points="0,-10 26,0 0,10 -26,0"
              fill="#1a1a1a"
            />
            <circle cx="0" cy="0" r="2.5" fill="#000000" />
            <path
              d="M 0 0 C -12 2 -22 6 -24 14"
              stroke="#000000"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <polygon
              points="-24,14 -21,24 -27,24"
              fill="#000000"
            />
          </g>
        </g>

        {/* Bottom Ribbon: STRIVE FOR SUCCESS */}
        <g id="ribbon-compact" transform="translate(0, 10)">
          <path
            d="M 75 295 L 45 285 L 56 300 L 42 318 L 76 312 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 225 295 L 255 285 L 244 300 L 258 318 L 224 312 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 66 302 Q 150 334, 234 302 L 238 322 Q 150 354, 62 322 Z"
            fill="#000000"
            stroke="#000000"
            strokeWidth="1.5"
          />
          <text
            x="150"
            y="323"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Arial Black', Impact, sans-serif"
            fontSize="8.5"
            fontWeight="900"
            letterSpacing="1.2"
          >
            STRIVE FOR SUCCESS
          </text>
        </g>
      </svg>

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
