import React from 'react';
import type { Metadata } from 'next';
import { DocumentTool } from '@/components/DocumentTool';
import { Receipt, Shield, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Payment Receipt Generator — InvoiceGen Pro',
  description:
    'Generate compliant payment receipts for small businesses and independent contractors. Vector PDF export, transaction ID records, and proof-of-payment documentation.',
};

export default function ReceiptToolPage() {
  return (
    <div className="pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Receipt className="w-3.5 h-3.5" />
              <span>Core Tool Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Official Payment Receipt Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Issue legally binding proof of payment. Record transaction IDs, payment methods, settled dates, and balance zeroing for client accounting and tax compliance.
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
        <DocumentTool initialType="receipt" />
      </div>

      {/* Receipt Compliance Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Why Official Receipts Matter for Tax Audits
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                While an invoice indicates money is owed, tax authorities worldwide require an <strong>official receipt</strong> to verify that money was actually paid and received. Issuing immediate receipts:
                <br />
                • Prevents duplicate payment inquiries and accounting disputes.
                <br />
                • Supplies your client with the verifiable documentation their CPA needs to claim legitimate business expense deductions.
                <br />
                • Completes the professional transaction loop, leaving clients with an outstanding impression of your business rigor.
              </p>
              <div className="pt-2">
                <Link
                  href="/blog/tax-deductions-and-financial-recordkeeping"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900"
                >
                  <span>Read: Keeping Invoices & Receipts Audit-Ready</span>
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
