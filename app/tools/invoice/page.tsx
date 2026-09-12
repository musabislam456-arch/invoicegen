import React from 'react';
import type { Metadata } from 'next';
import { DocumentTool } from '@/components/DocumentTool';
import { FileText, CheckCircle2, Shield, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Invoice Generator with Vector PDF Export — InvoiceGen Pro',
  description:
    'Generate free professional PDF invoices for freelancers and small businesses. Custom logo upload, multi-currency, auto-tax, line items, and instant client-side download.',
};

export default function InvoiceToolPage() {
  return (
    <div className="pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Core Tool Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Professional Invoice Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Assemble itemized bills with custom tax rates, multi-currency formatting, client billing records, and banking instructions.
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
        <DocumentTool initialType="invoice" />
      </div>

      {/* Invoicing Best Practices Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                3 Keys to Getting Your Invoices Paid Faster
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                1. <strong>Always specify an exact calendar date for payment</strong> rather than &quot;Due in 30 days&quot;. Specific deadlines create immediate accountability in corporate AP queues.
                <br />
                2. <strong>Reference the client&apos;s Purchase Order (PO) number</strong>. Many enterprise accounts payable departments will automatically reject invoices missing an internal PO.
                <br />
                3. <strong>Include wire and electronic payment instructions directly on the invoice</strong>, quoting the invoice number in the payment memo for instantaneous reconciliation.
              </p>
              <div className="pt-2">
                <Link
                  href="/blog/invoice-best-practices-for-freelancers"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>Read full guide: Invoice Best Practices for Freelancers</span>
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
