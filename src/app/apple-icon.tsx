import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #4DA3FF 0%, #3A6EA5 50%, #1F4FD8 100%)',
          borderRadius: '22%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid lines */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 100 100"
          style={{ position: 'absolute', opacity: 0.06 }}
        >
          <line x1="0" y1="33" x2="100" y2="33" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="66" x2="100" y2="66" stroke="white" strokeWidth="0.5" />
          <line x1="33" y1="0" x2="33" y2="100" stroke="white" strokeWidth="0.5" />
          <line x1="66" y1="0" x2="66" y2="100" stroke="white" strokeWidth="0.5" />
        </svg>
        
        {/* Light rays */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 100 100"
          style={{ position: 'absolute', opacity: 0.1 }}
        >
          <line x1="50" y1="38" x2="15" y2="10" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="38" x2="85" y2="10" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="38" x2="15" y2="60" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="38" x2="85" y2="60" stroke="white" strokeWidth="0.5" />
        </svg>
        
        {/* Sun glow */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            width: '45%',
            height: '45%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
          }}
        />
        
        {/* Sun */}
        <div
          style={{
            position: 'absolute',
            top: '22%',
            width: '38%',
            height: '38%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
          }}
        />
        
        {/* Code brackets */}
        <span
          style={{
            position: 'absolute',
            top: '18%',
            left: '10%',
            color: 'rgba(255,255,255,0.15)',
            fontSize: '24px',
            fontFamily: 'monospace',
            fontWeight: 300,
          }}
        >
          {'<'}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '45%',
            right: '10%',
            color: 'rgba(255,255,255,0.15)',
            fontSize: '24px',
            fontFamily: 'monospace',
            fontWeight: 300,
          }}
        >
          {'>'}
        </span>
        
        {/* Waves */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 100 100"
          style={{ position: 'absolute', bottom: 0 }}
        >
          <path
            d="M0 72 Q12 67 25 72 Q38 77 50 72 Q62 67 75 72 Q88 77 100 72 L100 100 L0 100 Z"
            fill="rgba(255,255,255,0.2)"
          />
          <path
            d="M0 80 Q12 75 25 80 Q38 85 50 80 Q62 75 75 80 Q88 85 100 80 L100 100 L0 100 Z"
            fill="rgba(255,255,255,0.32)"
          />
          <path
            d="M0 88 Q12 84 25 88 Q38 92 50 88 Q62 84 75 88 Q88 92 100 88 L100 100 L0 100 Z"
            fill="rgba(255,255,255,0.45)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
