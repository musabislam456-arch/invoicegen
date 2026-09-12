# InvoiceGen Pro

**Live site:** [www.utilix.site](https://www.utilix.site)

Free, professional invoice, quote, and receipt generator with instant vector PDF export — 100% client-side.

## Features

- **Invoice**, **Quote**, and **Receipt** generators
- Multi-currency support with auto-tax calculation
- Logo upload and corporate styling
- Vector PDF export, no account required
- Blog for SEO and billing/invoicing guides
- 100% client-side — nothing is uploaded to a server

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS, Google Fonts (Plus Jakarta Sans, Lora)
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/invoice, tools/quote, tools/receipt, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, etc.)
lib/            Blog data and shared constants
```

## License

All rights reserved.
