import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'InvoiceGen Pro — Free Professional Invoice, Quote & Receipt Generator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0b1120 0%, #1e2a4a 55%, #334155 100%)',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 18,
              background: '#ca8a04',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 52,
              fontWeight: 700,
              color: '#0b1120',
              boxShadow: '0 8px 24px rgba(202,138,4,0.4)',
            }}
          >
            $
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, color: '#ffffff', letterSpacing: -1 }}>
            InvoiceGen Pro
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#cbd5e1', maxWidth: 940, textAlign: 'center', fontFamily: 'sans-serif' }}>
          Free Professional Invoice, Quote &amp; Receipt Generator
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16, fontFamily: 'sans-serif' }}>
          {['Invoices', 'Quotes', 'Receipts', 'PDF Export'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 22px',
                borderRadius: 6,
                background: 'rgba(202,138,4,0.15)',
                color: '#fde68a',
                fontSize: 20,
                border: '1px solid rgba(202,138,4,0.4)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
