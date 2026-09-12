import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, EyeOff, ServerOff, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — InvoiceGen Pro',
  description:
    'InvoiceGen Pro Privacy Policy: Learn how our zero-server data retention model protects your financial documents and client details entirely within your browser.',
};

export default function PrivacyPage() {
  return (
    <div className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Client-Side Zero Data Retention Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated & Ratified: September 2026 • Version 2.4
        </p>
      </div>

      {/* Core Privacy Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 shadow-xs">
          <ServerOff className="w-5 h-5 text-amber-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">No Server Storage</h4>
          <p className="text-xs text-slate-600">Your documents are rendered exclusively in client browser RAM.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 shadow-xs">
          <EyeOff className="w-5 h-5 text-emerald-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Zero Tracking</h4>
          <p className="text-xs text-slate-600">We do not profile your client names, rates, or business revenue.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 shadow-xs">
          <Database className="w-5 h-5 text-blue-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Local Persistence</h4>
          <p className="text-xs text-slate-600">Drafts are saved only in your device&apos;s private LocalStorage.</p>
        </div>
      </div>

      {/* Policy Text */}
      <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm space-y-6 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">1. Architectural Statement of Privacy</h2>
          <p>
            InvoiceGen Pro Technologies Inc. (&quot;InvoiceGen Pro&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates on an uncompromising data protection philosophy: <strong>what we never collect can never be breached</strong>.
          </p>
          <p>
            Unlike traditional accounting applications that require users to upload client rosters, hourly billable rates, banking routing numbers, and tax identification figures (EIN, VAT, SSN) to remote cloud databases, our document generators execute <strong>100% within your local device’s web browser sandbox</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">2. Information Handled Exclusively on Your Device</h2>
          <p>
            When utilizing our Invoice Generator, Quotation/Estimate Generator, or Payment Receipt Generator, you input information including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Your business name, sender contact, physical address, email, and tax registration numbers.</li>
            <li>Client company details, client contact personnel, and billing addresses.</li>
            <li>Itemized project deliverables, hours worked, unit rates, and totals.</li>
            <li>Banking, ACH routing, IBAN, and wire remittance coordinates.</li>
            <li>Company logo graphic assets.</li>
          </ul>
          <p>
            <strong>All of the above parameters are processed strictly in local browser memory.</strong> At no point are these data payloads sent across network channels to our servers or stored on remote storage buckets.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">3. Local Storage & Draft Auto-Saving</h2>
          <p>
            To provide a convenient user experience so you do not lose your line items upon accidental browser refreshes, InvoiceGen Pro utilizes your browser&apos;s native <code className="text-amber-700 font-mono text-xs">window.localStorage</code> API. This data resides solely on your computer or mobile hardware. You can wipe this data at any time by clearing your browser cache or clicking &quot;Clear All&quot; inside the generator workspace.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">4. Third-Party PDF Rendering (jsPDF)</h2>
          <p>
            PDF compilation is handled through the open-source client-side library <strong>jsPDF</strong>. Binary file creation occurs entirely through local JavaScript execution; no remote print server or conversion API is contacted during PDF creation or download.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">5. Communications & Support Data</h2>
          <p>
            If you voluntarily submit an inquiry through our Contact Desk, we receive only the details you explicitly enter (your name, email address, organization, and message content). This data is used solely to respond to your question and is never sold or rented to marketing syndicates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">6. Compliance with International Standards (GDPR / CCPA / PIPEDA)</h2>
          <p>
            Because we do not store personal financial data on remote servers, users automatically retain complete data sovereignty. Under GDPR Article 17 (&quot;Right to be Forgotten&quot;), clearing your browser storage permanently erases all trace of your generated documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-slate-900">7. Inquiries Regarding Privacy</h2>
          <p>
            For any legal questions regarding our architecture or compliance standards, contact our privacy officer at <a href="mailto:privacy@invoicegenpro.com" className="text-amber-700 font-semibold hover:underline">privacy@invoicegenpro.com</a> or write to:
          </p>
          <div className="p-3.5 rounded-lg bg-slate-100 text-slate-700 text-xs">
            InvoiceGen Pro Technologies Inc. <br />
            Attn: Data Privacy & Compliance Desk <br />
            450 Mission Street, Suite 1400 <br />
            San Francisco, CA 94105, United States
          </div>
        </section>

      </div>

    </div>
  );
}
