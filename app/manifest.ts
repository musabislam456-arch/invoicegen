import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'InvoiceGen Pro',
    short_name: 'InvoiceGen',
    description:
      'Free Professional Invoice, Quote & Receipt Generator with instant PDF export.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1120',
    theme_color: '#ca8a04',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
