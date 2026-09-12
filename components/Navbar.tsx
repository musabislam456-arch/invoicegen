'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Calculator, Receipt, BookOpen, ShieldCheck, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 text-slate-950 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-serif">
              InvoiceGen <span className="text-amber-400 font-sans text-xs px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-600/40 uppercase tracking-wider font-semibold">Pro</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Small Business & Freelance Suite</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          
          {/* Tools Menu with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                pathname?.startsWith('/tools')
                  ? 'text-amber-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>Generators</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 w-72 pt-2 z-50">
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 space-y-1">
                  <Link
                    href="/tools/invoice"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-amber-400">Invoice Generator</div>
                      <div className="text-xs text-slate-400">Line items, tax, discounts, & PDF</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/quote"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-amber-400">Quotation / Estimate</div>
                      <div className="text-xs text-slate-400">Project scope, validity, 1-click convert</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/receipt"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-amber-400">Receipt Generator</div>
                      <div className="text-xs text-slate-400">Proof of payment & settled records</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/blog') ? 'text-amber-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Guides & Blog
          </Link>

          <Link
            href="/about"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/about') ? 'text-amber-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/contact') ? 'text-amber-400 bg-slate-800/80' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/tools/invoice"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm shadow-md shadow-amber-500/20 transition-all hover:shadow-lg active:scale-98"
          >
            <span>Create Invoice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2">Financial Tools</div>
          <Link
            href="/tools/invoice"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Invoice Generator</span>
          </Link>
          <Link
            href="/tools/quote"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Quotation / Estimate Generator</span>
          </Link>
          <Link
            href="/tools/receipt"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            <Receipt className="w-4 h-4 text-emerald-400" />
            <span>Receipt Generator</span>
          </Link>

          <div className="border-t border-slate-800 my-2 pt-2">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Guides & Best Practices</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>About InvoiceGen Pro</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/tools/invoice"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm"
            >
              <span>Launch Invoice Tool</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
