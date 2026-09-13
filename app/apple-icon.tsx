import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
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
          background: '#1e2a4a',
        }}
      >
        <div
          style={{
            width: 82,
            height: 82,
            borderRadius: 14,
            background: '#ca8a04',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 50,
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
