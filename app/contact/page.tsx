'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate brief network latency for authentic feel
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
          <span>Support & Commercial Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 leading-tight">
          Get in Touch with InvoiceGen Pro
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Have feedback on our PDF layout engine, feature suggestions for new document templates, or corporate partnership inquiries? Our team responds within 1 business day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Info & Support Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold font-serif text-white">Direct Channels</h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Email Communications</div>
                  <div className="text-slate-400">support@invoicegenpro.com</div>
                  <div className="text-slate-400">partners@invoicegenpro.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Operations Hours</div>
                  <div className="text-slate-400">Monday – Friday, 8:00 AM – 6:00 PM EST</div>
                  <div className="text-slate-400">Average response time: &lt; 4 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Corporate Headquarters</div>
                  <div className="text-slate-400">450 Mission Street, Suite 1400</div>
                  <div className="text-slate-400">San Francisco, CA 94105, United States</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero unsolicited spam guarantee</span>
              </div>
              <p>
                We never share or monetize contact submissions with advertising brokers.
              </p>
            </div>
          </div>

          {/* Quick FAQ pointer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
            <h4 className="text-sm font-bold font-serif text-slate-900">Need Immediate Help?</h4>
            <p className="text-xs text-slate-600">
              Check out our in-depth guides on invoice payment terms, PDF troubleshooting, and tax recordkeeping.
            </p>
            <div className="pt-2">
              <Link href="/blog" className="text-xs font-bold text-amber-700 hover:text-amber-800">
                Explore Documentation & Guides →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  Message Transmitted Successfully
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name || 'there'}</strong>. A senior support representative will review your message and reply to <strong>{formData.email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', organization: '', inquiryType: 'general', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">Send an Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1">Fill out the fields below and our operations desk will follow up.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jordan Miller"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Business Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jordan@consulting.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-org" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Organization / Agency Name
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Miller Studio LLC"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-type"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                    >
                      <option value="general">General Question</option>
                      <option value="template">Template / Feature Request</option>
                      <option value="bug">PDF Rendering / Bug Report</option>
                      <option value="partnership">Corporate Partnership / Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist your workflow or outline any recommendations..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 active:scale-98 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 stroke-[2.2]" />
                    <span>{submitting ? 'Transmitting...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
