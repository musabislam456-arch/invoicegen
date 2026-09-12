import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Calculator, 
  Receipt, 
  ShieldCheck, 
  Download, 
  Lock, 
  Sparkles, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle,
  Clock,
  Coins,
  FileCheck
} from 'lucide-react';
import { DocumentTool } from '@/components/DocumentTool';
import { BLOG_POSTS } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-14 pb-20 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        {/* Gold glow accent in top right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Privacy • Zero Server Data Retention</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.15]">
              Corporate-Grade Invoices & Estimates. <span className="text-amber-400 italic">Built for Speed.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Create, customize, and export audit-ready PDF invoices, project quotations, and official receipts. No subscription fees, no accounts, and zero sensitive billing data stored on external servers.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/tools/invoice"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>Create an Invoice</span>
              </Link>

              <Link
                href="/tools/quote"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Estimate Generator</span>
              </Link>

              <Link
                href="/tools/receipt"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
              >
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span>Receipt Generator</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Instant Vector PDF Export</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>30+ Currencies & Auto-Tax</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Free & Unlimited Use</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Live Generator Suite */}
      <section className="-mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <span>Interactive Document Studio</span>
              <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/60 uppercase">Live Demo</span>
            </h2>
            <div className="text-xs text-slate-500 hidden sm:block">
              Auto-saves to browser storage
            </div>
          </div>
        </div>
        
        {/* The Full Featured Tool */}
        <DocumentTool initialType="invoice" />
      </section>

      {/* Why InvoiceGen Pro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Enterprise Standards</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            Engineered for Independent Financial Discipline
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Most online invoice generators lock your clients’ sensitive billing info behind proprietary databases. InvoiceGen Pro provides true privacy with native client-side rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
              <Lock className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">Absolute Client-Side Privacy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Your financial records, client addresses, tax identifiers, and rates are calculated exclusively in your browser session. Zero data packets are dispatched to our servers.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>GDPR & CCPA Compliant by architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>No risk of vendor data leaks</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
              <Download className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">Sharp Vector PDF Engine</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Export high-resolution, print-ready PDFs rendered with standard fonts and structured tables that look impeccably professional on screen or printed paper.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Clean selectable text and sharp logos</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>A4 standard margins & page alignment</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
              <Globe2 className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif">Multi-Currency & Tax Precision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Seamlessly bill international clients with full support for USD, EUR, GBP, AUD, CAD, JPY, and customizable sales tax, VAT, GST, and compounding discounts.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Customizable tax labels (VAT/GST/MwSt)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fixed or percentage discounts & shipping fees</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Document Workflow: Quote -> Invoice -> Receipt */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">The Complete Commercial Lifecycle</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              From Initial Scope to Settled Payment
            </h2>
            <p className="text-slate-300 text-sm">
              Understand how our three unified generators support your business relationship across every phase of contracting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Quote */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4 relative">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase">
                Stage 01 • Proposal
              </div>
              <h3 className="text-xl font-bold font-serif text-white">Quotation / Estimate</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Define the project scope, specify deliverable milestones, and set a legal validity deadline before starting work.
              </p>
              <div className="pt-2">
                <Link
                  href="/tools/quote"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Open Estimate Generator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 2: Invoice */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4 relative">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold uppercase">
                Stage 02 • Billing
              </div>
              <h3 className="text-xl font-bold font-serif text-white">Commercial Invoice</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bill completed deliverables with clear Net terms, bank wire instructions, and tax breakdowns that expedite corporate AP approval.
              </p>
              <div className="pt-2">
                <Link
                  href="/tools/invoice"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Open Invoice Generator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 3: Receipt */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4 relative">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase">
                Stage 03 • Settlement
              </div>
              <h3 className="text-xl font-bold font-serif text-white">Payment Receipt</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Issue a verifiable receipt confirming payment has cleared in full. Gives clients peace of mind and tax-compliant documentation.
              </p>
              <div className="pt-2">
                <Link
                  href="/tools/receipt"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Open Receipt Generator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Educational Articles / Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Knowledge & Best Practices</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Mastering Invoicing & Cash Flow
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-amber-600 transition-colors"
          >
            <span>Browse All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-amber-700 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                    {post.author.avatar}
                  </div>
                  <span className="font-medium text-slate-700">{post.author.name}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Corporate FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            Common Invoicing Questions Answered
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 font-serif">
              Is my financial data saved or uploaded to your servers?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No. InvoiceGen Pro is architected with a strict client-side engine. All monetary calculations, client details, line items, and PDF generation happen directly within your browser&apos;s execution memory. If you refresh or return later, your draft is optionally saved strictly in your local browser storage (<code className="text-amber-700 font-mono text-xs">localStorage</code>).
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 font-serif">
              Are these generated PDFs legally compliant for tax filing?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. Our documents adhere to international accounting standards (IRS, HMRC, CRA, ATO, and EU VAT regulations), providing dedicated fields for seller and buyer tax identifiers (EIN, VAT, GST), distinct issue and due dates, unique sequential numbers, itemized line items, and bank remittance directions.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 font-serif">
              Can I convert an estimate into an invoice once my client accepts?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes! Use the <strong>&quot;Convert to Invoice&quot;</strong> command button in our tool. It automatically changes the document classification to an invoice, preserves your agreed deliverables, line items, pricing, and tax settings, and generates an invoice number with custom payment terms.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 font-serif">
              Is InvoiceGen Pro truly free to use?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yes. There are no hidden trial periods, watermark overlays, or item limits. Independent contractors and small businesses can generate and download as many invoices, estimates, and receipts as they need.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Ready to Upgrade Your Invoicing Standard?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Generate your first vector PDF invoice in under two minutes. No account registration or credit card required.
            </p>
          </div>

          <Link
            href="/tools/invoice"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all shrink-0"
          >
            <span>Create Invoice Now</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </section>

    </div>
  );
}
