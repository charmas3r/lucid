import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
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
        {/* Sun */}
        <div
          style={{
            position: 'absolute',
            top: '22%',
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
          }}
        />
        {/* Wave */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          style={{ position: 'absolute', bottom: 0 }}
        >
          <path
            d="M0 75 Q25 68 50 75 Q75 82 100 75 L100 100 L0 100 Z"
            fill="rgba(255,255,255,0.35)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
