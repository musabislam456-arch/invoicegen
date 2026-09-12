'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  DocumentData, 
  DocumentType, 
  LineItem, 
  CurrencyConfig 
} from '@/lib/types';
import { 
  CURRENCIES, 
  DEFAULT_INVOICE, 
  DEFAULT_QUOTE, 
  DEFAULT_RECEIPT 
} from '@/lib/constants';
import { 
  calculateTotals, 
  formatMoney, 
  generateDocumentPDF 
} from '@/lib/pdfGenerator';
import { 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  Upload, 
  RefreshCw, 
  FileText, 
  Calculator, 
  Receipt, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  User, 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Eye, 
  Edit3, 
  Shield, 
  ArrowRightCircle, 
  Image as ImageIcon,
  Save
} from 'lucide-react';

interface DocumentToolProps {
  initialType?: DocumentType;
}

export function DocumentTool({ initialType = 'invoice' }: DocumentToolProps) {
  // Initialize state based on initialType and saved drafts
  const [doc, setDoc] = useState<DocumentData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`invoicen-pro-draft-${initialType}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.type === initialType) {
            return parsed;
          }
        }
      } catch {
        // Fallback to defaults
      }
    }
    if (initialType === 'quote') return { ...DEFAULT_QUOTE };
    if (initialType === 'receipt') return { ...DEFAULT_RECEIPT };
    return { ...DEFAULT_INVOICE };
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`invoicen-pro-draft-${doc.type}`, JSON.stringify(doc));
    } catch {
      // Ignore
    }
  }, [doc]);

  // Calculate live totals
  const totals = calculateTotals(doc);

  // Handlers for switching document types
  const handleTypeChange = (newType: DocumentType) => {
    if (newType === doc.type) return;

    if (newType === 'invoice') {
      setDoc((prev) => ({
        ...prev,
        type: 'invoice',
        number: prev.number.replace(/^(EST|REC|DOC)/, 'INV') || 'INV-2026-0042',
        dueDate: prev.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        status: 'sent',
      }));
    } else if (newType === 'quote') {
      setDoc((prev) => ({
        ...prev,
        type: 'quote',
        number: prev.number.replace(/^(INV|REC|DOC)/, 'EST') || 'EST-2026-0018',
        validUntil: prev.validUntil || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        status: 'draft',
      }));
    } else if (newType === 'receipt') {
      setDoc((prev) => ({
        ...prev,
        type: 'receipt',
        number: prev.number.replace(/^(INV|EST|DOC)/, 'REC') || 'REC-2026-0091',
        paymentDate: prev.paymentDate || new Date().toISOString().split('T')[0],
        transactionId: prev.transactionId || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'paid',
        amountPaid: totals.total,
      }));
    }
  };

  // 1-Click Conversion: Estimate -> Invoice
  const convertEstimateToInvoice = () => {
    setDoc((prev) => ({
      ...prev,
      type: 'invoice',
      number: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'sent',
      notes: `Converted from approved Estimate #${prev.number}. Thank you for authorizing the project scope!`,
    }));
    triggerToast();
  };

  // 1-Click Conversion: Invoice -> Receipt
  const convertInvoiceToReceipt = () => {
    setDoc((prev) => ({
      ...prev,
      type: 'receipt',
      number: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      paymentDate: new Date().toISOString().split('T')[0],
      transactionId: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`,
      status: 'paid',
      amountPaid: totals.total,
      notes: `Payment received in full for Invoice #${prev.number}. Thank you for your business!`,
      terms: 'This receipt serves as official proof of payment. Please retain for your tax and accounting records.',
    }));
    triggerToast();
  };

  const triggerToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('Logo file size must be under 3MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDoc((prev) => ({ ...prev, logoDataUrl: result }));
      triggerToast();
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setDoc((prev) => ({ ...prev, logoDataUrl: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Line Item Handlers
  const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
    setDoc((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        // Recalculate amount if qty or rate changed
        if (field === 'quantity' || field === 'rate') {
          const q = field === 'quantity' ? Number(value) : item.quantity;
          const r = field === 'rate' ? Number(value) : item.rate;
          updated.amount = (q || 0) * (r || 0);
        }
        return updated;
      });
      return { ...prev, items: updatedItems };
    });
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: 'Consulting & Professional Services',
      quantity: 1,
      rate: 150,
      taxable: true,
      amount: 150,
    };
    setDoc((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id: string) => {
    if (doc.items.length <= 1) return;
    setDoc((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  // Preset loaders
  const loadPreset = (presetName: 'designer' | 'consultant' | 'contractor' | 'reset') => {
    if (presetName === 'designer') {
      setDoc({ ...DEFAULT_INVOICE });
    } else if (presetName === 'consultant') {
      setDoc({
        ...DEFAULT_INVOICE,
        senderBusiness: 'Vanguard Strategic Advisory LLC',
        senderName: 'Marcus Vance',
        senderAddress: '100 Wall Street, 15th Floor, New York, NY 10005',
        clientBusiness: 'Aegis BioTech Industries',
        clientContact: 'Dr. Evelyn Reed, Head of Operations',
        items: [
          {
            id: 'con-1',
            description: 'Q3 Enterprise Systems Architecture Audit & Compliance Review',
            quantity: 1,
            rate: 6500,
            taxable: true,
            amount: 6500,
          },
          {
            id: 'con-2',
            description: 'Executive Technology Strategy & Board Presentation Preparation',
            quantity: 18,
            rate: 220,
            taxable: true,
            amount: 3960,
          },
        ],
        taxRate: 8.875,
        taxLabel: 'State/City Tax (8.875%)',
        discountValue: 0,
      });
    } else if (presetName === 'contractor') {
      setDoc({
        ...DEFAULT_INVOICE,
        senderBusiness: 'Keystone Commercial Builders & Engineering',
        senderName: 'David Miller',
        senderAddress: '880 Industrial Pkwy, Chicago, IL 60607',
        clientBusiness: 'Northwind Logistics Terminal',
        items: [
          {
            id: 'c-1',
            description: 'Phase 1 Structural Framing & High-Load Concrete Pouring',
            quantity: 1,
            rate: 14200,
            taxable: true,
            amount: 14200,
          },
          {
            id: 'c-2',
            description: 'Heavy Equipment Rental & On-Site Crane Operation (3 Days)',
            quantity: 3,
            rate: 1850,
            taxable: true,
            amount: 5550,
          },
        ],
        taxRate: 7.5,
        taxLabel: 'Contractor Tax (7.5%)',
        discountValue: 500,
      });
    } else if (presetName === 'reset') {
      setDoc({
        type: doc.type,
        id: `doc-${Date.now()}`,
        number: `${doc.type.toUpperCase()}-${new Date().getFullYear()}-0001`,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Bank Transfer (ACH / Wire)',
        transactionId: '',
        poNumber: '',
        currency: CURRENCIES[0],
        status: 'draft',
        senderName: '',
        senderBusiness: '',
        senderEmail: '',
        senderPhone: '',
        senderAddress: '',
        senderCityStateZip: '',
        senderTaxId: '',
        clientBusiness: '',
        clientContact: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
        clientCityStateZip: '',
        clientTaxId: '',
        items: [
          {
            id: 'item-1',
            description: '',
            quantity: 1,
            rate: 0,
            taxable: true,
            amount: 0,
          },
        ],
        taxRate: 0,
        taxLabel: 'Sales Tax (0%)',
        discountType: 'fixed',
        discountValue: 0,
        shipping: 0,
        amountPaid: 0,
        paymentTerms: 'Due Upon Receipt',
        bankName: '',
        accountName: '',
        accountNumber: '',
        routingIban: '',
        swiftBic: '',
        additionalPaymentInfo: '',
        notes: '',
        terms: '',
        signatureName: '',
        signatureTitle: '',
      });
    }
    triggerToast();
  };

  // PDF Export Trigger
  const handleExportPdf = () => {
    setIsGeneratingPdf(true);
    try {
      generateDocumentPDF(doc);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Unable to generate PDF. Please verify document fields.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Print View Trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Top Utility Command Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-3.5 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Document Type Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => handleTypeChange('invoice')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                doc.type === 'invoice'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Invoice</span>
            </button>

            <button
              onClick={() => handleTypeChange('quote')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                doc.type === 'quote'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Quote / Estimate</span>
            </button>

            <button
              onClick={() => handleTypeChange('receipt')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                doc.type === 'receipt'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Payment Receipt</span>
            </button>
          </div>

          {/* Quick Presets & 1-Click Conversions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {doc.type === 'quote' && (
              <button
                onClick={convertEstimateToInvoice}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600/30 transition-colors"
                title="Convert this quote into a billable invoice"
              >
                <ArrowRightCircle className="w-3.5 h-3.5" />
                <span>Convert to Invoice</span>
              </button>
            )}

            {doc.type === 'invoice' && (
              <button
                onClick={convertInvoiceToReceipt}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
                title="Mark this invoice as settled and issue receipt"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Issue Receipt</span>
              </button>
            )}

            {/* Presets dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Load Sample</span>
              </button>
              <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50 w-48">
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-1.5 space-y-1 text-xs">
                  <button
                    onClick={() => loadPreset('designer')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200"
                  >
                    UI/UX Design Agency
                  </button>
                  <button
                    onClick={() => loadPreset('consultant')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200"
                  >
                    Strategy Consultant
                  </button>
                  <button
                    onClick={() => loadPreset('contractor')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200"
                  >
                    Commercial Contractor
                  </button>
                  <div className="border-t border-slate-800 my-1"></div>
                  <button
                    onClick={() => loadPreset('reset')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-950/40 text-red-400"
                  >
                    Clear All (Blank)
                  </button>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              title="Print document or save via system dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Export PDF Button */}
            <button
              onClick={handleExportPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 active:scale-98 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Editor/Preview Viewport Toggle */}
      <div className="lg:hidden bg-slate-100 border-b border-slate-200 p-2 flex items-center justify-center gap-2 no-print">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'editor'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'preview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Document Preview</span>
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT: Editor Controls (7 Cols on desktop) */}
          {/* ========================================================= */}
          <div className={`lg:col-span-6 xl:col-span-6 space-y-6 no-print ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Header & Meta Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Document Parameters
                  </h3>
                </div>

                {/* Currency selector */}
                <div className="flex items-center gap-2">
                  <label htmlFor="currency-select" className="text-xs font-medium text-slate-500">Currency:</label>
                  <select
                    id="currency-select"
                    value={doc.currency.code}
                    onChange={(e) => {
                      const selected = CURRENCIES.find((c) => c.code === e.target.value) || CURRENCIES[0];
                      setDoc((prev) => ({ ...prev, currency: selected }));
                    }}
                    className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number, Dates, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="doc-number-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {doc.type === 'quote' ? 'Estimate #' : doc.type === 'receipt' ? 'Receipt #' : 'Invoice #'}
                  </label>
                  <input
                    id="doc-number-input"
                    type="text"
                    value={doc.number}
                    onChange={(e) => setDoc((prev) => ({ ...prev, number: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    placeholder="INV-2026-0001"
                  />
                </div>

                <div>
                  <label htmlFor="doc-issue-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Issue Date
                  </label>
                  <input
                    id="doc-issue-date"
                    type="date"
                    value={doc.issueDate}
                    onChange={(e) => setDoc((prev) => ({ ...prev, issueDate: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                  />
                </div>

                {doc.type === 'invoice' && (
                  <div>
                    <label htmlFor="doc-due-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Due Date
                    </label>
                    <input
                      id="doc-due-date"
                      type="date"
                      value={doc.dueDate}
                      onChange={(e) => setDoc((prev) => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>
                )}

                {doc.type === 'quote' && (
                  <div>
                    <label htmlFor="doc-valid-until" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Valid Until
                    </label>
                    <input
                      id="doc-valid-until"
                      type="date"
                      value={doc.validUntil}
                      onChange={(e) => setDoc((prev) => ({ ...prev, validUntil: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>
                )}

                {doc.type === 'receipt' && (
                  <div>
                    <label htmlFor="doc-payment-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Payment Date
                    </label>
                    <input
                      id="doc-payment-date"
                      type="date"
                      value={doc.paymentDate}
                      onChange={(e) => setDoc((prev) => ({ ...prev, paymentDate: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Status and Secondary Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <label htmlFor="doc-status-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Document Status
                  </label>
                  <select
                    id="doc-status-select"
                    value={doc.status}
                    onChange={(e) => setDoc((prev) => ({ ...prev, status: e.target.value as any }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 capitalize focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent / Issued</option>
                    <option value="paid">Paid in Full</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="doc-po-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    P.O. Number
                  </label>
                  <input
                    id="doc-po-input"
                    type="text"
                    value={doc.poNumber}
                    onChange={(e) => setDoc((prev) => ({ ...prev, poNumber: e.target.value }))}
                    placeholder="e.g. PO-9842"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                  />
                </div>

                {doc.type === 'receipt' ? (
                  <div>
                    <label htmlFor="doc-txn-id" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Transaction ID
                    </label>
                    <input
                      id="doc-txn-id"
                      type="text"
                      value={doc.transactionId}
                      onChange={(e) => setDoc((prev) => ({ ...prev, transactionId: e.target.value }))}
                      placeholder="e.g. TXN-8921"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="doc-payment-terms" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Payment Terms
                    </label>
                    <input
                      id="doc-payment-terms"
                      type="text"
                      value={doc.paymentTerms}
                      onChange={(e) => setDoc((prev) => ({ ...prev, paymentTerms: e.target.value }))}
                      placeholder="e.g. Net 14 Days"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Logo Upload Section */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {doc.logoDataUrl ? (
                    <div className="relative w-16 h-12 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={doc.logoDataUrl} alt="Company Logo" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 bg-slate-50">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-800">Company Logo</div>
                    <div className="text-[11px] text-slate-500">PNG, JPG or WebP (max 3MB)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload-input"
                  />
                  <label
                    htmlFor="logo-upload-input"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{doc.logoDataUrl ? 'Change Logo' : 'Upload Logo'}</span>
                  </label>
                  {doc.logoDataUrl && (
                    <button
                      onClick={removeLogo}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      title="Remove logo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Sender & Client Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Sender Info */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Building className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Your Business (From)
                  </h4>
                </div>

                <div>
                  <label htmlFor="sender-biz" className="block text-[11px] font-semibold text-slate-600 mb-1">Business / Brand Name</label>
                  <input
                    id="sender-biz"
                    type="text"
                    value={doc.senderBusiness}
                    onChange={(e) => setDoc((prev) => ({ ...prev, senderBusiness: e.target.value }))}
                    placeholder="e.g. Apex Strategic Design LLC"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="sender-name" className="block text-[11px] font-semibold text-slate-600 mb-1">Your Name</label>
                    <input
                      id="sender-name"
                      type="text"
                      value={doc.senderName}
                      onChange={(e) => setDoc((prev) => ({ ...prev, senderName: e.target.value }))}
                      placeholder="Elena Rostova"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sender-tax-id" className="block text-[11px] font-semibold text-slate-600 mb-1">Tax ID / EIN / VAT</label>
                    <input
                      id="sender-tax-id"
                      type="text"
                      value={doc.senderTaxId}
                      onChange={(e) => setDoc((prev) => ({ ...prev, senderTaxId: e.target.value }))}
                      placeholder="EIN: 94-3829104"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sender-address" className="block text-[11px] font-semibold text-slate-600 mb-1">Street Address</label>
                  <input
                    id="sender-address"
                    type="text"
                    value={doc.senderAddress}
                    onChange={(e) => setDoc((prev) => ({ ...prev, senderAddress: e.target.value }))}
                    placeholder="450 Mission Street, Suite 1400"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="sender-city-state-zip" className="block text-[11px] font-semibold text-slate-600 mb-1">City, State, Zip, Country</label>
                    <input
                      id="sender-city-state-zip"
                      type="text"
                      value={doc.senderCityStateZip}
                      onChange={(e) => setDoc((prev) => ({ ...prev, senderCityStateZip: e.target.value }))}
                      placeholder="San Francisco, CA 94105, USA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sender-email" className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address</label>
                    <input
                      id="sender-email"
                      type="email"
                      value={doc.senderEmail}
                      onChange={(e) => setDoc((prev) => ({ ...prev, senderEmail: e.target.value }))}
                      placeholder="billing@apexstudio.design"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <User className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {doc.type === 'quote' ? 'Estimate For (Client)' : 'Billed To (Client)'}
                  </h4>
                </div>

                <div>
                  <label htmlFor="client-biz" className="block text-[11px] font-semibold text-slate-600 mb-1">Client Company Name</label>
                  <input
                    id="client-biz"
                    type="text"
                    value={doc.clientBusiness}
                    onChange={(e) => setDoc((prev) => ({ ...prev, clientBusiness: e.target.value }))}
                    placeholder="e.g. Horizon FinTech Group Inc."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="client-contact" className="block text-[11px] font-semibold text-slate-600 mb-1">Contact Name / Title</label>
                    <input
                      id="client-contact"
                      type="text"
                      value={doc.clientContact}
                      onChange={(e) => setDoc((prev) => ({ ...prev, clientContact: e.target.value }))}
                      placeholder="Marcus Vance, VP Product"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="client-tax-id" className="block text-[11px] font-semibold text-slate-600 mb-1">Client Tax ID / VAT</label>
                    <input
                      id="client-tax-id"
                      type="text"
                      value={doc.clientTaxId}
                      onChange={(e) => setDoc((prev) => ({ ...prev, clientTaxId: e.target.value }))}
                      placeholder="US-139284712"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="client-address" className="block text-[11px] font-semibold text-slate-600 mb-1">Client Street Address</label>
                  <input
                    id="client-address"
                    type="text"
                    value={doc.clientAddress}
                    onChange={(e) => setDoc((prev) => ({ ...prev, clientAddress: e.target.value }))}
                    placeholder="120 Broadway, 28th Floor"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="client-city-state-zip" className="block text-[11px] font-semibold text-slate-600 mb-1">City, State, Zip, Country</label>
                    <input
                      id="client-city-state-zip"
                      type="text"
                      value={doc.clientCityStateZip}
                      onChange={(e) => setDoc((prev) => ({ ...prev, clientCityStateZip: e.target.value }))}
                      placeholder="New York, NY 10271, USA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="client-email" className="block text-[11px] font-semibold text-slate-600 mb-1">Accounts Payable Email</label>
                    <input
                      id="client-email"
                      type="email"
                      value={doc.clientEmail}
                      onChange={(e) => setDoc((prev) => ({ ...prev, clientEmail: e.target.value }))}
                      placeholder="ap@horizonfintech.io"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Line Items Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-serif">
                    Itemized Deliverables & Services
                  </h3>
                </div>
                <button
                  onClick={addItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {doc.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2 group transition-all hover:bg-white hover:shadow-xs"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-[11px] font-bold text-slate-400 mt-2 w-4">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          placeholder="Description of deliverable, consultation, or product"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-amber-500 outline-none"
                        />
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={doc.items.length <= 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-12 gap-3 pl-6">
                      <div className="col-span-4 sm:col-span-3">
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-0.5">Quantity / Hrs</label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-4">
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-0.5">Unit Rate ({doc.currency.symbol})</label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-5 flex items-center justify-end pt-3">
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-semibold text-slate-500 mr-2">Subtotal:</span>
                          <span className="text-xs font-bold text-slate-900">
                            {formatMoney(item.amount, doc.currency.symbol)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Adjustments: Tax, Discount, Shipping */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
                Tax, Adjustments & Payment Status
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Tax */}
                <div>
                  <label htmlFor="tax-rate-input" className="block text-xs font-semibold text-slate-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="tax-rate-input"
                      type="number"
                      min="0"
                      step="0.1"
                      value={doc.taxRate}
                      onChange={(e) => setDoc((prev) => ({ ...prev, taxRate: Number(e.target.value) || 0 }))}
                      className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                    <input
                      type="text"
                      value={doc.taxLabel}
                      onChange={(e) => setDoc((prev) => ({ ...prev, taxLabel: e.target.value }))}
                      placeholder="e.g. VAT (8%)"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <label htmlFor="discount-val-input" className="block text-xs font-semibold text-slate-700 mb-1">
                    Discount
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={doc.discountType}
                      onChange={(e) => setDoc((prev) => ({ ...prev, discountType: e.target.value as any }))}
                      className="w-18 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    >
                      <option value="fixed">{doc.currency.symbol} Fixed</option>
                      <option value="percentage">% Pct</option>
                    </select>
                    <input
                      id="discount-val-input"
                      type="number"
                      min="0"
                      value={doc.discountValue}
                      onChange={(e) => setDoc((prev) => ({ ...prev, discountValue: Number(e.target.value) || 0 }))}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <label htmlFor="shipping-input" className="block text-xs font-semibold text-slate-700 mb-1">
                    Shipping / Handling ({doc.currency.symbol})
                  </label>
                  <input
                    id="shipping-input"
                    type="number"
                    min="0"
                    value={doc.shipping}
                    onChange={(e) => setDoc((prev) => ({ ...prev, shipping: Number(e.target.value) || 0 }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Amount Paid (for Invoices & Receipts) */}
              {doc.type === 'invoice' && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Prior Amount Paid (Deposit)</div>
                    <div className="text-[11px] text-slate-500">Deducts from current balance due</div>
                  </div>
                  <div className="w-36">
                    <input
                      type="number"
                      min="0"
                      value={doc.amountPaid}
                      onChange={(e) => setDoc((prev) => ({ ...prev, amountPaid: Number(e.target.value) || 0 }))}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 text-right font-medium focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Banking & Remittance Instructions */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <CreditCard className="w-4 h-4 text-slate-700" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {doc.type === 'receipt' ? 'Payment Settlement Particulars' : 'Banking & Wire Instructions'}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bank-name-input" className="block text-[11px] font-semibold text-slate-600 mb-1">Bank Name / Gateway</label>
                  <input
                    id="bank-name-input"
                    type="text"
                    value={doc.bankName}
                    onChange={(e) => setDoc((prev) => ({ ...prev, bankName: e.target.value }))}
                    placeholder="e.g. Silicon Valley Commercial Bank"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="account-name-input" className="block text-[11px] font-semibold text-slate-600 mb-1">Account Beneficiary Name</label>
                  <input
                    id="account-name-input"
                    type="text"
                    value={doc.accountName}
                    onChange={(e) => setDoc((prev) => ({ ...prev, accountName: e.target.value }))}
                    placeholder="Apex Strategic Design Studio LLC"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="account-num-input" className="block text-[11px] font-semibold text-slate-600 mb-1">Account Number / Card Ref</label>
                  <input
                    id="account-num-input"
                    type="text"
                    value={doc.accountNumber}
                    onChange={(e) => setDoc((prev) => ({ ...prev, accountNumber: e.target.value }))}
                    placeholder="**** **** 4892"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="routing-iban-input" className="block text-[11px] font-semibold text-slate-600 mb-1">Routing (ACH) / IBAN / SWIFT</label>
                  <input
                    id="routing-iban-input"
                    type="text"
                    value={doc.routingIban}
                    onChange={(e) => setDoc((prev) => ({ ...prev, routingIban: e.target.value }))}
                    placeholder="Routing: 021000089"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="additional-payment-info" className="block text-[11px] font-semibold text-slate-600 mb-1">Additional Payment Notes (Zelle, Stripe, Wire memo)</label>
                <input
                  id="additional-payment-info"
                  type="text"
                  value={doc.additionalPaymentInfo}
                  onChange={(e) => setDoc((prev) => ({ ...prev, additionalPaymentInfo: e.target.value }))}
                  placeholder="Please reference invoice number on wire transfer."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
                Notes & Terms of Service
              </h3>

              <div>
                <label htmlFor="doc-notes-input" className="block text-[11px] font-semibold text-slate-600 mb-1">Notes to Client</label>
                <textarea
                  id="doc-notes-input"
                  rows={2}
                  value={doc.notes}
                  onChange={(e) => setDoc((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Thank you for your business..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="doc-terms-input" className="block text-[11px] font-semibold text-slate-600 mb-1">Terms & Conditions</label>
                <textarea
                  id="doc-terms-input"
                  rows={2}
                  value={doc.terms}
                  onChange={(e) => setDoc((prev) => ({ ...prev, terms: e.target.value }))}
                  placeholder="Payment is due within 14 calendar days..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                />
              </div>

              {/* Signature sign-off */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label htmlFor="sig-name" className="block text-[11px] font-semibold text-slate-600 mb-1">Authorized Signer Name</label>
                  <input
                    id="sig-name"
                    type="text"
                    value={doc.signatureName}
                    onChange={(e) => setDoc((prev) => ({ ...prev, signatureName: e.target.value }))}
                    placeholder="Elena Rostova"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="sig-title" className="block text-[11px] font-semibold text-slate-600 mb-1">Signer Title</label>
                  <input
                    id="sig-title"
                    type="text"
                    value={doc.signatureTitle}
                    onChange={(e) => setDoc((prev) => ({ ...prev, signatureTitle: e.target.value }))}
                    placeholder="Principal Creative Director"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT: Live WYSIWYG Corporate Paper Preview */}
          {/* ========================================================= */}
          <div className={`lg:col-span-6 xl:col-span-6 sticky top-22 ${activeTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
            
            <div className="flex items-center justify-between mb-3 no-print">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Document Preview</span>
              </div>
              <span className="text-xs text-slate-500">Vector standard • A4 Sheet</span>
            </div>

            {/* Paper Sheet Representation */}
            <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 overflow-hidden text-slate-900 transition-all print-container">
              
              {/* Header Accent Stripes */}
              <div className="h-2 bg-slate-900 w-full"></div>
              <div className="h-1 bg-amber-500 w-full"></div>

              <div className="p-6 sm:p-8 space-y-6 text-xs">
                
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  {/* Sender & Logo */}
                  <div className="space-y-1.5 max-w-[60%]">
                    {doc.logoDataUrl && (
                      <div className="mb-2 max-h-12 max-w-[140px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={doc.logoDataUrl} alt="Logo" className="max-h-12 object-contain" />
                      </div>
                    )}
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-tight">
                      {doc.senderBusiness || doc.senderName || 'Business Name'}
                    </h2>
                    {doc.senderName && doc.senderBusiness && (
                      <p className="text-slate-600 text-[11px]">{doc.senderName}</p>
                    )}
                    {doc.senderAddress && (
                      <p className="text-slate-500 text-[11px] leading-tight">{doc.senderAddress}</p>
                    )}
                    {doc.senderCityStateZip && (
                      <p className="text-slate-500 text-[11px] leading-tight">{doc.senderCityStateZip}</p>
                    )}
                    {(doc.senderEmail || doc.senderPhone) && (
                      <p className="text-slate-500 text-[11px]">{[doc.senderEmail, doc.senderPhone].filter(Boolean).join(' • ')}</p>
                    )}
                    {doc.senderTaxId && (
                      <p className="text-slate-700 font-semibold text-[11px]">{doc.senderTaxId}</p>
                    )}
                  </div>

                  {/* Title & Document Number */}
                  <div className="text-right space-y-1">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-serif uppercase block">
                      {doc.type === 'invoice' ? 'INVOICE' : doc.type === 'quote' ? 'ESTIMATE' : 'RECEIPT'}
                    </span>
                    <span className="text-xs font-bold text-amber-600 block">
                      # {doc.number || 'DOC-001'}
                    </span>
                    <div className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                      {doc.status}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-200"></div>

                {/* Metadata Row: Bill To & Document Dates */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Client Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                      {doc.type === 'quote' ? 'Prepared For:' : doc.type === 'receipt' ? 'Receipt Issued To:' : 'Billed To:'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {doc.clientBusiness || doc.clientContact || 'Client Name / Organization'}
                    </h3>
                    {doc.clientContact && doc.clientBusiness && (
                      <p className="text-slate-600 text-[11px]">Attn: {doc.clientContact}</p>
                    )}
                    {doc.clientAddress && (
                      <p className="text-slate-500 text-[11px] leading-tight">{doc.clientAddress}</p>
                    )}
                    {doc.clientCityStateZip && (
                      <p className="text-slate-500 text-[11px] leading-tight">{doc.clientCityStateZip}</p>
                    )}
                    {(doc.clientEmail || doc.clientPhone) && (
                      <p className="text-slate-500 text-[11px]">{[doc.clientEmail, doc.clientPhone].filter(Boolean).join(' • ')}</p>
                    )}
                    {doc.clientTaxId && (
                      <p className="text-slate-600 text-[11px]">{doc.clientTaxId}</p>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="text-right space-y-1 text-[11px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block text-right">
                      Document Details:
                    </span>
                    <div className="flex justify-between sm:justify-end gap-3 text-slate-600">
                      <span className="font-semibold text-slate-700">Issue Date:</span>
                      <span>{doc.issueDate || '—'}</span>
                    </div>

                    {doc.type === 'invoice' && (
                      <div className="flex justify-between sm:justify-end gap-3 text-slate-600">
                        <span className="font-semibold text-slate-700">Payment Due:</span>
                        <span className="font-bold text-slate-900">{doc.dueDate || 'Upon Receipt'}</span>
                      </div>
                    )}

                    {doc.type === 'quote' && (
                      <div className="flex justify-between sm:justify-end gap-3 text-slate-600">
                        <span className="font-semibold text-slate-700">Valid Until:</span>
                        <span className="font-bold text-slate-900">{doc.validUntil || '30 Days'}</span>
                      </div>
                    )}

                    {doc.type === 'receipt' && (
                      <div className="flex justify-between sm:justify-end gap-3 text-slate-600">
                        <span className="font-semibold text-slate-700">Payment Date:</span>
                        <span className="font-bold text-slate-900">{doc.paymentDate || doc.issueDate}</span>
                      </div>
                    )}

                    {doc.poNumber && (
                      <div className="flex justify-between sm:justify-end gap-3 text-slate-600">
                        <span className="font-semibold text-slate-700">PO Number:</span>
                        <span>{doc.poNumber}</span>
                      </div>
                    )}

                    {doc.paymentTerms && doc.type !== 'receipt' && (
                      <div className="flex justify-between sm:justify-end gap-3 text-slate-600">
                        <span className="font-semibold text-slate-700">Terms:</span>
                        <span>{doc.paymentTerms}</span>
                      </div>
                    )}

                    {doc.type === 'receipt' && doc.paymentMethod && (
                      <div className="flex justify-between sm:justify-end gap-3 text-slate-600">
                        <span className="font-semibold text-slate-700">Method:</span>
                        <span>{doc.paymentMethod}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-[10px] uppercase font-bold tracking-wider">
                        <th className="py-2 px-3 rounded-l">Description</th>
                        <th className="py-2 px-2 text-right">Qty</th>
                        <th className="py-2 px-2 text-right">Rate</th>
                        <th className="py-2 px-3 text-right rounded-r">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px]">
                      {doc.items.map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 1 ? 'bg-slate-50/50' : ''}>
                          <td className="py-2.5 px-3 font-medium text-slate-800">
                            {item.description || 'Deliverable description'}
                          </td>
                          <td className="py-2.5 px-2 text-right text-slate-600">
                            {item.quantity}
                          </td>
                          <td className="py-2.5 px-2 text-right text-slate-600">
                            {formatMoney(item.rate, doc.currency.symbol)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                            {formatMoney(item.amount, doc.currency.symbol)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Financial Summary & Banking Details */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
                  
                  {/* Left: Banking / Notes */}
                  <div className="sm:col-span-6 space-y-3">
                    {(doc.bankName || doc.accountNumber || doc.additionalPaymentInfo) && (
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                          {doc.type === 'receipt' ? 'Settlement Verification' : 'Remittance Details'}
                        </div>
                        {doc.bankName && <p className="text-[11px] text-slate-700"><strong>Bank:</strong> {doc.bankName}</p>}
                        {doc.accountName && <p className="text-[11px] text-slate-700"><strong>Account:</strong> {doc.accountName}</p>}
                        {doc.accountNumber && <p className="text-[11px] text-slate-700"><strong>Acc #:</strong> {doc.accountNumber}</p>}
                        {doc.routingIban && <p className="text-[11px] text-slate-700"><strong>Routing/IBAN:</strong> {doc.routingIban}</p>}
                        {doc.swiftBic && <p className="text-[11px] text-slate-700"><strong>SWIFT:</strong> {doc.swiftBic}</p>}
                        {doc.additionalPaymentInfo && (
                          <p className="text-[10px] text-slate-500 pt-1">{doc.additionalPaymentInfo}</p>
                        )}
                      </div>
                    )}

                    {doc.notes && (
                      <div>
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Notes:</span>
                        <p className="text-[10px] text-slate-600 leading-relaxed">{doc.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Calculations */}
                  <div className="sm:col-span-6 space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-800">{formatMoney(totals.subtotal, doc.currency.symbol)}</span>
                    </div>

                    {totals.discountAmount > 0 && (
                      <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700">
                        <span>Discount {doc.discountType === 'percentage' ? `(${doc.discountValue}%)` : ''}</span>
                        <span>-{formatMoney(totals.discountAmount, doc.currency.symbol)}</span>
                      </div>
                    )}

                    {totals.taxAmount > 0 && (
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                        <span>{doc.taxLabel || `Tax (${doc.taxRate}%)`}</span>
                        <span className="font-semibold text-slate-800">{formatMoney(totals.taxAmount, doc.currency.symbol)}</span>
                      </div>
                    )}

                    {totals.shippingAmount > 0 && (
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                        <span>Shipping / Handling</span>
                        <span className="font-semibold text-slate-800">{formatMoney(totals.shippingAmount, doc.currency.symbol)}</span>
                      </div>
                    )}

                    {/* Total Band */}
                    <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900 text-white font-bold">
                      <span className="text-xs uppercase tracking-wider">{doc.type === 'receipt' ? 'Total Paid' : 'Total Due'}</span>
                      <span className="text-sm">{formatMoney(totals.total, doc.currency.symbol)}</span>
                    </div>

                    {doc.type === 'invoice' && totals.amountPaid > 0 && (
                      <>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>Amount Paid</span>
                          <span>{formatMoney(totals.amountPaid, doc.currency.symbol)}</span>
                        </div>
                        <div className="flex justify-between py-1.5 font-bold text-slate-900">
                          <span>Balance Remaining</span>
                          <span className="text-amber-700">{formatMoney(totals.balanceDue, doc.currency.symbol)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Terms and Signature */}
                {doc.terms && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Terms & Conditions:</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{doc.terms}</p>
                  </div>
                )}

                {doc.signatureName && (
                  <div className="pt-4 flex justify-between items-end">
                    <div className="border-t border-slate-300 pt-1 w-48">
                      <p className="font-bold text-slate-900 text-xs">{doc.signatureName}</p>
                      {doc.signatureTitle && <p className="text-slate-500 text-[10px]">{doc.signatureTitle}</p>}
                    </div>
                    <div className="text-[9px] text-slate-400">
                      Generated with InvoiceGen Pro • ISO 27001 Standard
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Quick Action under preview */}
            <div className="mt-4 flex items-center justify-between no-print">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Private: Processed in your browser memory</span>
              </div>
              <button
                onClick={handleExportPdf}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download PDF</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Floating Save/Update Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-medium animate-bounce no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Changes saved locally to your device</span>
        </div>
      )}
    </div>
  );
}
