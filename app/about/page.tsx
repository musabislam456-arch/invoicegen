import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  FileText, 
  CheckCircle2, 
  Users, 
  Award, 
  ArrowRight,
  Sparkles,
  Building
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About InvoiceGen Pro — The Client-Side Financial Document Suite',
  description:
    'Learn why we created InvoiceGen Pro: to provide independent freelancers, contractors, and small businesses with private, corporate-grade invoicing tools with zero server tracking.',
};

export default function AboutPage() {
  return (
    <div className="py-14 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <Building className="w-3.5 h-3.5 text-amber-600" />
          <span>Our Mission & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 leading-tight">
          Financial Tooling Built Around Complete Client Privacy
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          InvoiceGen Pro was founded on a simple realization: independent operators should not have to surrender their clients’ sensitive contracts, hourly rates, and banking credentials to proprietary third-party clouds just to generate a standard PDF bill.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-serif text-slate-900">Zero Server Data Retention</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Unlike traditional accounting SaaS platforms that ingest your ledger for advertising profiling or training, our generators execute 100% inside your browser session. If you don&apos;t save your PDF locally, we don&apos;t have it.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-serif text-slate-900">Corporate-Grade Aesthetic</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            First impressions dictate payment velocity. An invoice formatted with crisp typography, balanced margins, and explicit payment terms immediately communicates that you run an established, audit-compliant business.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-serif text-slate-900">Free & Unrestricted</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            We believe fundamental administrative tools should be accessible to anyone starting a trade or freelance career. No arbitrary item caps, no watermarks, and no mandatory monthly subscriptions.
          </p>
        </div>

      </div>

      {/* Story & Context */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">The Problem We Solved</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">
            Why We Rejected the &quot;Cloud-First&quot; Invoicing Trap
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            When you run a freelance consultancy or boutique agency, your clients frequently require Non-Disclosure Agreements (NDAs) and strict data protection standards. Storing client billing addresses, project code names, and bank account details on generic web portals can unintentionally violate those client covenants.
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            InvoiceGen Pro utilizes client-side vector rendering via <code className="text-amber-300 font-mono text-xs">jsPDF</code>. When you click <em>&quot;Download PDF&quot;</em>, the document compiles directly inside your machine&apos;s RAM. You get the exact same vector quality as high-end accounting software, without exposing client metadata to the public web.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Encrypted local storage only</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Universal A4 and Letter vector compliance</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Built by independent software engineers</span>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center max-w-xl mx-auto space-y-4 pt-4">
        <h2 className="text-2xl font-bold font-serif text-slate-900">
          Ready to Build Your Next Invoice?
        </h2>
        <p className="text-slate-600 text-sm">
          No sign up, no email required. Start right away and download your document in seconds.
        </p>
        <div>
          <Link
            href="/tools/invoice"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98"
          >
            <span>Launch Invoice Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
