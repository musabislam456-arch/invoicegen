import React from 'react';
import type { Metadata } from 'next';
import { Scale, FileText, AlertCircle, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — InvoiceGen Pro',
  description:
    'Terms of Service governing the use of InvoiceGen Pro document generators, PDF export services, and educational resources.',
};

export default function TermsPage() {
  return (
    <div className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-amber-600" />
          <span>Legal Agreement & User Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 leading-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Effective Date: September 1, 2026 • Version 2.2
        </p>
      </div>

      {/* Advisory Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-amber-900">
          <span className="font-bold">Important Financial & Legal Disclaimer:</span>
          <p className="leading-relaxed">
            InvoiceGen Pro provides document layout software and educational materials. We are not a registered public accounting firm, financial advisor, or legal counsel. Users are responsible for verifying local tax collection rules and statutory invoice compliance in their governing jurisdiction.
          </p>
        </div>
      </div>

      {/* Policy Text */}
      <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm space-y-6 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or utilizing the InvoiceGen Pro web application (including any subdomains, document creation tools, PDF exporters, and guides), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must refrain from using the application.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">2. Permitted Commercial Use</h2>
          <p>
            InvoiceGen Pro grants you a worldwide, royalty-free, non-exclusive license to utilize our tools for generating invoices, project quotations, and payment receipts in connection with your personal, freelance, contractor, or business affairs.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>You own 100% of all intellectual property in the content, deliverables, and logos you input into our tools.</li>
            <li>You may export and send generated PDFs to clients without paying licensing fees or attribution royalties to InvoiceGen Pro.</li>
            <li>You may not scrape, reverse-engineer, or attempt to resell access to our underlying application infrastructure as a competing standalone service.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">3. User Responsibility for Financial Accuracy</h2>
          <p>
            While our generators perform mathematical totals, tax sums, and discount subtotals in real-time, it is the sole responsibility of the user to confirm:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>The correctness of all calculated tax percentages (VAT, GST, Sales Tax).</li>
            <li>The validity of banking routing numbers, IBANs, and wire coordinates.</li>
            <li>Compliance with specific national invoice disclosure mandates (such as French Factur-X, German ZUGFeRD, or UK Making Tax Digital).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">4. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, INVOICEGEN PRO DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">5. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL INVOICEGEN PRO TECHNOLOGIES INC., ITS OFFICERS, DIRECTORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR COMMERCIAL GOODWILL) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICE.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">6. Modifications to Service</h2>
          <p>
            We reserve the right to modify, enhance, or discontinue features of InvoiceGen Pro at any time without prior notice. We encourage users to maintain secondary local backups of all finalized PDF documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">7. Governing Law & Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles.
          </p>
        </section>

      </div>

    </div>
  );
}
