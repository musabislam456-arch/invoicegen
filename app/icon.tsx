import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
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
          background: '#1e2a4a',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 16,
            background: '#ca8a04',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 56,
            fontWeight: 700,
            color: '#0b1120',
            fontFamily: 'serif',
          }}
        >
          $
        </div>
      </div>
    ),
    { ...size }
  );
}
