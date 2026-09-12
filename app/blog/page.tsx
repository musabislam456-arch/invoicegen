import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/constants';
import { BookOpen, Clock, ArrowRight, User, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Invoicing Guides & Cash Flow Advisory — InvoiceGen Pro',
  description:
    'Expert advice on getting paid faster, mastering payment terms, and keeping small business financial records audit-ready. Real strategies for independent operators.',
};

export default function BlogListingPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>Practical Financial Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 leading-tight">
          Invoicing Best Practices & Small Business Strategy
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Tactical advice written by former corporate controllers and independent practitioners to help you compress days sales outstanding (DSO), eliminate payment friction, and defend your business against audits.
        </p>
      </div>

      {/* Featured Article Banner */}
      {BLOG_POSTS[0] && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-[10px]">
                  Featured Advisory
                </span>
                <span className="text-slate-400">{BLOG_POSTS[0].readingTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white hover:text-amber-400 transition-colors">
                <Link href={`/blog/${BLOG_POSTS[0].slug}`}>
                  {BLOG_POSTS[0].title}
                </Link>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {BLOG_POSTS[0].excerpt}
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  {BLOG_POSTS[0].author.avatar}
                </div>
                <span>By {BLOG_POSTS[0].author.name} • {BLOG_POSTS[0].author.role}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href={`/blog/${BLOG_POSTS[0].slug}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold font-serif text-slate-900 border-b border-slate-200 pb-3">
          All Guides & Practical Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-amber-700 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                    {post.author.avatar}
                  </div>
                  <span className="font-medium text-slate-700 truncate max-w-[140px]">{post.author.name}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 shrink-0"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
