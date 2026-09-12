import React from 'react';
import Link from 'next/link';
import { FileText, Shield, Lock, Award, HeartHandshake } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Company & Value prop */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                InvoiceGen <span className="text-amber-400 font-sans text-xs px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600/40 uppercase">Pro</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The premier client-side financial document generator built specifically for independent contractors, freelancers, and growing small businesses. Vector PDF export with zero server logging.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-md">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Client-Side Private</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-md">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Server Data Retention</span>
              </div>
            </div>
          </div>

          {/* Generators */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Financial Generators</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tools/invoice" className="hover:text-amber-400 transition-colors">
                  Invoice Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/quote" className="hover:text-amber-400 transition-colors">
                  Quotation & Estimate Tool
                </Link>
              </li>
              <li>
                <Link href="/tools/receipt" className="hover:text-amber-400 transition-colors">
                  Payment Receipt Generator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-amber-400 transition-colors">
                  All Document Presets
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Guides & Advisory</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/blog/invoice-best-practices-for-freelancers" className="hover:text-amber-400 transition-colors">
                  Invoice Best Practices
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-get-paid-faster" className="hover:text-amber-400 transition-colors">
                  How to Get Paid Faster
                </Link>
              </li>
              <li>
                <Link href="/blog/payment-terms-net-15-net-30-explained" className="hover:text-amber-400 transition-colors">
                  Net 15 & Net 30 Terms
                </Link>
              </li>
              <li>
                <Link href="/blog/tax-deductions-and-financial-recordkeeping" className="hover:text-amber-400 transition-colors">
                  Tax Audit & Records
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Company & Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom divider & Legal Notice */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InvoiceGen Pro Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Compliant with ISO 27001 Data Privacy Principles</span>
            <span>Commercial-grade jsPDF Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
