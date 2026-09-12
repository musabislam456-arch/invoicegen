import React from 'react';
import type { Metadata } from 'next';
import { DocumentTool } from '@/components/DocumentTool';
import { Calculator, Shield, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Quotation & Estimate Generator — InvoiceGen Pro',
  description:
    'Create professional project quotes and cost estimates with milestone breakdown, legal validity terms, and instant 1-click conversion to invoice.',
};

export default function QuoteToolPage() {
  return (
    <div className="pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>Core Tool Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Project Quotation & Estimate Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Produce detailed commercial proposals and scope estimates. Set validity periods, deposit terms, and convert to an active invoice in one click upon acceptance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Zero server storage • 100% Private</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool */}
      <div className="pt-4">
        <DocumentTool initialType="quote" />
      </div>

      {/* Quotation Best Practices Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Why Detailed Estimates Win More Contracts
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear scope definitions protect you against scope creep and establish immediate confidence with corporate decision-makers. Always include:
                <br />
                • <strong>Validity Window:</strong> State a firm expiration date (typically 30 days) to protect against supply or contractor rate fluctuations.
                <br />
                • <strong>Retainer Terms:</strong> Stipulate required milestone deposits (e.g. 50% upfront) prior to project kickoff.
                <br />
                • <strong>Seamless Conversion:</strong> Once the client approves your proposal, click <em>&quot;Convert to Invoice&quot;</em> above to generate the billing record with zero double-entry.
              </p>
              <div className="pt-2">
                <Link
                  href="/blog/how-to-get-paid-faster"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>Read: 7 Strategies to Get Paid Faster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
