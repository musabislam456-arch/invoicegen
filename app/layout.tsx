import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Lora } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const serifFont = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.utilix.site'),
  title: 'InvoiceGen Pro — Free Professional Invoice, Quote & Receipt Generator',
  description:
    'Create, customize, and export professional vector PDF invoices, quotations/estimates, and receipts. 100% client-side privacy, multi-currency, auto-tax, logo upload, and corporate styling.',
  keywords: [
    'invoice generator',
    'free invoice maker',
    'receipt generator',
    'quote generator',
    'estimate maker',
    'freelance invoice template',
    'small business billing',
    'PDF invoice download',
  ],
  authors: [{ name: 'InvoiceGen Pro Technologies' }],
  openGraph: {
    title: 'InvoiceGen Pro — Free Professional Invoice, Quote & Receipt Generator',
    description:
      'Generate vector PDF invoices, quotes, and payment receipts in seconds. No account required, 100% private in-browser generation.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.utilix.site',
    siteName: 'InvoiceGen Pro',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'InvoiceGen Pro — Free Professional Invoice, Quote & Receipt Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvoiceGen Pro — B2B Financial Document Generator',
    description:
      'Create compliant invoices, estimates, and receipts with instant PDF export. Multi-currency, tax calculation, and logo upload.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/apple-icon',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'I_SaNu0LrbiQSkKmCb7bm8LRBISuViD4KTJh0FHRo2s',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* CHATBOT_SCRIPT_START */}
        {/* Paste client's chatbot <script> embed code here */}
        {/* CHATBOT_SCRIPT_END */}
      </body>
    </html>
  );
}
