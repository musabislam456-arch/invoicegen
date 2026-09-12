import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  Calculator, 
  Receipt, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Layers, 
  Sparkles 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial Document Tool Suite — InvoiceGen Pro',
  description:
    'Explore InvoiceGen Pro’s full collection of free, client-side document generators: Invoices, Quotations & Estimates, and Payment Receipts.',
};

export default function ToolsOverviewPage() {
  const tools = [
    {
      title: 'Commercial Invoice Generator',
      slug: '/tools/invoice',
      icon: FileText,
      color: 'blue',
      badge: 'Billing & AR',
      description:
        'Standard B2B invoice builder with custom line items, tax rate computation, discounts, purchase order tracking, banking remittance details, and instant vector PDF export.',
      features: [
        'Custom Tax & VAT rates',
        'Net 14, Net 30, Due on Receipt terms',
        'Deposit and balance due tracking',
        'Logo upload & custom notes',
      ],
      cta: 'Open Invoice Generator',
    },
    {
      title: 'Quotation & Project Estimate Tool',
      slug: '/tools/quote',
      icon: Calculator,
      color: 'amber',
      badge: 'Proposals & Scope',
      description:
        'Generate structured project cost estimates and commercial quotes. Specify milestone breakdowns, validity deadlines, and convert to an invoice in 1 click.',
      features: [
        'Quote validity expiration dates',
        'Milestone retainer breakdowns',
        '1-click instant conversion to invoice',
        'Deliverable scope itemization',
      ],
      cta: 'Open Estimate Generator',
    },
    {
      title: 'Payment Receipt Generator',
      slug: '/tools/receipt',
      icon: Receipt,
      color: 'emerald',
      badge: 'Settlement & Tax',
      description:
        'Issue verifiable receipts verifying payment has been settled in full. Capture payment method, transaction IDs, authorization codes, and zero-balance confirmations.',
      features: [
        'Transaction ID & payment method records',
        'Audit-ready proof for client CPAs',
        'Instant balance zeroing',
        'Compliant tax receipt format',
      ],
      cta: 'Open Receipt Generator',
    },
  ];

  return (
    <div className="py-12 space-y-12">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>Complete Financial Document Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
          Professional Document Generators for Modern Work
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Select a tool below to begin. All generators function 100% in your browser memory with zero server tracking and instant vector PDF downloads.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((t) => {
            const IconComponent = t.icon;
            return (
              <div
                key={t.slug}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
                      <IconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                    {t.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {t.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Included Capabilities:</div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {t.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={t.slug}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold text-xs sm:text-sm shadow-sm transition-colors group-hover:bg-amber-500 group-hover:text-slate-950"
                  >
                    <span>{t.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Decision Matrix</span>
            <h2 className="text-2xl font-bold font-serif text-white">Which Document Do You Need?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              A quick reference guide for independent consultants and small business owners on choosing the proper legal document.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-amber-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Document Type</th>
                  <th className="py-3 px-4">When to Issue</th>
                  <th className="py-3 px-4">Key Legal Significance</th>
                  <th className="py-3 px-4">Action Expected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Quotation / Estimate</td>
                  <td className="py-3 px-4">Before project commencement or agreement execution</td>
                  <td className="py-3 px-4">Proposes commercial terms and cost ceiling without creating liability until signed</td>
                  <td className="py-3 px-4 text-amber-400">Client approves scope and authorizes kickoff</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Commercial Invoice</td>
                  <td className="py-3 px-4">Upon milestone completion or according to agreed billing schedule</td>
                  <td className="py-3 px-4">Formal legal request for consideration; registers account receivable</td>
                  <td className="py-3 px-4 text-amber-400">Client remits payment via specified bank/card rails</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Payment Receipt</td>
                  <td className="py-3 px-4">Immediately upon funds clearing in your business bank account</td>
                  <td className="py-3 px-4">Irrevocable proof that financial obligation was satisfied; vital for tax deductions</td>
                  <td className="py-3 px-4 text-amber-400">Client files with internal accounting or CPA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
