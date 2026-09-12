import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/constants';
import { ArrowLeft, Clock, User, Calendar, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) {
    return {
      title: 'Guide Not Found — InvoiceGen Pro',
    };
  }

  return {
    title: `${post.title} — InvoiceGen Pro Guides`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: '2026-09-01T00:00:00.000Z',
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Split markdown sections
  const contentParagraphs = post.content.trim().split('\n\n');

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Back to Blog */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Invoicing Guides</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider text-[11px]">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{post.publishDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-900 leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
          {post.excerpt}
        </p>

        {/* Author Bio Line */}
        <div className="flex items-center gap-3 pt-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm shadow-sm">
            {post.author.avatar}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
            <div className="text-xs text-slate-500">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Key Takeaways Callout Card */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
          Executive Summary
        </div>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          Clear, professional invoicing is a direct driver of business solvency. By adopting itemized clarity, unambiguous calendar due dates, milestone retainers, and compliant payment receipts, you systematically remove administrative reasons for clients to delay your payouts.
        </p>
      </div>

      {/* Article Main Body */}
      <div className="prose prose-slate max-w-none space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
        {contentParagraphs.map((block, idx) => {
          const trimmed = block.trim();
          if (trimmed.startsWith('### ')) {
            return (
              <h2 key={idx} className="text-2xl font-bold font-serif text-slate-900 pt-4 pb-1">
                {trimmed.replace('### ', '')}
              </h2>
            );
          }
          if (trimmed.startsWith('---')) {
            return <hr key={idx} className="border-slate-200 my-6" />;
          }
          if (trimmed.startsWith('|')) {
            return null; // Skip raw markdown table or render cleanly
          }
          return (
            <p key={idx} className="leading-relaxed">
              {trimmed}
            </p>
          );
        })}
      </div>

      {/* Interactive Tool Recommendation Box */}
      <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Put It Into Practice</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif">
          Create an Audit-Ready Invoice in Under 2 Minutes
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Apply these best practices right now. Use our free, client-side invoice generator with line items, tax computations, and vector PDF download.
        </p>
        <div className="pt-2">
          <Link
            href="/tools/invoice"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98"
          >
            <span>Launch Free Invoice Tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
        <Link
          href="/blog"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Guides</span>
        </Link>
        <Link
          href="/tools"
          className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
        >
          <span>Explore All Document Generators</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </article>
  );
}
