import { CurrencyConfig, DocumentData, BlogPost } from './types';

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CA$)' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (A$)' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc (CHF)' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (¥)' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'SGD', symbol: 'SG$', name: 'Singapore Dollar (SG$)' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham (AED)' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar (NZ$)' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona (kr)' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand (R)' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso (Mex$)' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real (R$)' },
];

export const DEFAULT_INVOICE: DocumentData = {
  type: 'invoice',
  id: 'doc-inv-1',
  number: 'INV-2026-0042',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
  validUntil: '',
  paymentDate: '',
  paymentMethod: 'Bank Transfer (ACH / Wire)',
  transactionId: '',
  poNumber: 'PO-88219',
  currency: CURRENCIES[0],
  status: 'sent',

  senderName: 'Elena Rostova',
  senderBusiness: 'Apex Strategic Design Studio',
  senderEmail: 'billing@apexstudio.design',
  senderPhone: '+1 (415) 890-3412',
  senderAddress: '450 Mission Street, Suite 1400',
  senderCityStateZip: 'San Francisco, CA 94105, USA',
  senderTaxId: 'EIN: 94-3829104',

  clientBusiness: 'Horizon FinTech Group Inc.',
  clientContact: 'Marcus Vance, VP of Product',
  clientEmail: 'accounts-payable@horizonfintech.io',
  clientPhone: '+1 (212) 555-0199',
  clientAddress: '120 Broadway, 28th Floor',
  clientCityStateZip: 'New York, NY 10271, USA',
  clientTaxId: 'TAX ID: US-139284712',

  items: [
    {
      id: 'item-1',
      description: 'Phase 2: SaaS Design System & Interactive Component Library (Figma)',
      quantity: 1,
      rate: 4800,
      taxable: true,
      amount: 4800,
    },
    {
      id: 'item-2',
      description: 'User Onboarding Flow UX Research & High-Fidelity Prototyping (40 hrs)',
      quantity: 40,
      rate: 110,
      taxable: true,
      amount: 4400,
    },
    {
      id: 'item-3',
      description: 'Design Handoff Documentation & Front-End Engineering Consultation',
      quantity: 12,
      rate: 125,
      taxable: true,
      amount: 1500,
    },
  ],

  taxRate: 8.5,
  taxLabel: 'Sales Tax (8.5%)',
  discountType: 'fixed',
  discountValue: 200,
  shipping: 0,
  amountPaid: 0,

  paymentTerms: 'Net 14 Days. Direct ACH or Wire Transfer preferred.',
  bankName: 'Silicon Valley Commercial Bank',
  accountName: 'Apex Strategic Design Studio LLC',
  accountNumber: '**** **** 4892',
  routingIban: '021000089',
  swiftBic: 'SVCBUS33',
  additionalPaymentInfo: 'For credit card or international payments, wire transfer is supported. Please quote invoice #INV-2026-0042.',

  notes: 'Thank you for partnering with Apex Studio! We value our collaboration on the Horizon FinTech platform launch.',
  terms: 'Payment is due within 14 calendar days from issue date. Late disbursements incur a 1.5% compounding finance fee per 30-day period.',
  signatureName: 'Elena Rostova',
  signatureTitle: 'Principal Creative Director',
};

export const DEFAULT_QUOTE: DocumentData = {
  type: 'quote',
  id: 'doc-quote-1',
  number: 'EST-2026-018',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  paymentDate: '',
  paymentMethod: 'Milestone Payments (50% Deposit / 50% Completion)',
  transactionId: '',
  poNumber: '',
  currency: CURRENCIES[0],
  status: 'draft',

  senderName: 'Elena Rostova',
  senderBusiness: 'Apex Strategic Design Studio',
  senderEmail: 'quotes@apexstudio.design',
  senderPhone: '+1 (415) 890-3412',
  senderAddress: '450 Mission Street, Suite 1400',
  senderCityStateZip: 'San Francisco, CA 94105, USA',
  senderTaxId: 'EIN: 94-3829104',

  clientBusiness: 'Vanguard Analytics Corp',
  clientContact: 'Sarah Jenkins, Chief Marketing Officer',
  clientEmail: 'sjenkins@vanguardanalytics.com',
  clientPhone: '+1 (617) 492-8811',
  clientAddress: '100 Federal Street, 19th Floor',
  clientCityStateZip: 'Boston, MA 02110, USA',
  clientTaxId: 'EIN: 04-9182736',

  items: [
    {
      id: 'item-q1',
      description: 'Brand Identity Strategy, Typography Selection, & Vector Logo Package',
      quantity: 1,
      rate: 3500,
      taxable: true,
      amount: 3500,
    },
    {
      id: 'item-q2',
      description: 'Responsive Corporate Web Application Design (Desktop & Mobile, 8 Pages)',
      quantity: 8,
      rate: 750,
      taxable: true,
      amount: 6000,
    },
    {
      id: 'item-q3',
      description: 'Interactive Micro-Interactions & Lottie Animation Asset Production',
      quantity: 1,
      rate: 1800,
      taxable: true,
      amount: 1800,
    },
  ],

  taxRate: 6.25,
  taxLabel: 'State Tax (6.25%)',
  discountType: 'percentage',
  discountValue: 5,
  shipping: 0,
  amountPaid: 0,

  paymentTerms: '50% initial non-refundable retainer required upon estimate acceptance; 50% upon final signoff.',
  bankName: 'Silicon Valley Commercial Bank',
  accountName: 'Apex Strategic Design Studio LLC',
  accountNumber: '**** **** 4892',
  routingIban: '021000089',
  swiftBic: 'SVCBUS33',
  additionalPaymentInfo: 'Acceptance can be signed directly on this estimate or confirmed via written corporate email.',

  notes: 'This project quote includes up to two rounds of design revisions per milestone. Production commences within 3 business days of deposit.',
  terms: 'This estimate remains valid for 30 days from the issue date. Pricing does not include third-party font or asset licensing fees unless specified.',
  signatureName: 'Elena Rostova',
  signatureTitle: 'Principal Creative Director',
};

export const DEFAULT_RECEIPT: DocumentData = {
  type: 'receipt',
  id: 'doc-rec-1',
  number: 'REC-2026-0091',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  validUntil: '',
  paymentDate: new Date().toISOString().split('T')[0],
  paymentMethod: 'Corporate Credit Card (Visa ending in 4109)',
  transactionId: 'TXN-9021884-APX',
  poNumber: 'PO-88219',
  currency: CURRENCIES[0],
  status: 'paid',

  senderName: 'Elena Rostova',
  senderBusiness: 'Apex Strategic Design Studio',
  senderEmail: 'receipts@apexstudio.design',
  senderPhone: '+1 (415) 890-3412',
  senderAddress: '450 Mission Street, Suite 1400',
  senderCityStateZip: 'San Francisco, CA 94105, USA',
  senderTaxId: 'EIN: 94-3829104',

  clientBusiness: 'Horizon FinTech Group Inc.',
  clientContact: 'Marcus Vance, VP of Product',
  clientEmail: 'accounts-payable@horizonfintech.io',
  clientPhone: '+1 (212) 555-0199',
  clientAddress: '120 Broadway, 28th Floor',
  clientCityStateZip: 'New York, NY 10271, USA',
  clientTaxId: 'TAX ID: US-139284712',

  items: [
    {
      id: 'item-r1',
      description: 'Phase 2: SaaS Design System & Interactive Component Library (Paid in Full)',
      quantity: 1,
      rate: 4800,
      taxable: true,
      amount: 4800,
    },
    {
      id: 'item-r2',
      description: 'User Onboarding Flow UX Research & High-Fidelity Prototyping (40 hrs)',
      quantity: 40,
      rate: 110,
      taxable: true,
      amount: 4400,
    },
    {
      id: 'item-r3',
      description: 'Design Handoff Documentation & Front-End Engineering Consultation',
      quantity: 12,
      rate: 125,
      taxable: true,
      amount: 1500,
    },
  ],

  taxRate: 8.5,
  taxLabel: 'Sales Tax (8.5%)',
  discountType: 'fixed',
  discountValue: 200,
  shipping: 0,
  amountPaid: 11158.50, // subtotal (10700) - discount (200) = 10500 + tax (8.5% of 10500 = 892.50) = 11392.5, or calculated

  paymentTerms: 'Payment Completed in Full. Thank you!',
  bankName: 'Stripe Corporate Billing',
  accountName: 'Apex Strategic Design Studio LLC',
  accountNumber: '**** 4109',
  routingIban: 'N/A (Card Gateway)',
  swiftBic: '',
  additionalPaymentInfo: 'Authorization Code: 094821. Settled via Stripe Card Processing Gateway.',

  notes: 'Payment has been cleared and posted to our ledger. All deliverable source assets and Figma libraries have been transferred to client team.',
  terms: 'This receipt serves as official legal and tax documentation of payment received in full. Retain for corporate expense filing.',
  signatureName: 'Elena Rostova',
  signatureTitle: 'Authorized Finance Officer',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'invoice-best-practices-for-freelancers',
    title: 'Invoice Best Practices for Freelancers: How to Ensure You Get Paid on Time',
    category: 'Freelance Finance',
    readingTime: '6 min read',
    publishDate: 'September 2026',
    excerpt: 'Late payments plague independent professionals. Learn the battle-tested conventions, itemization techniques, and contract clauses that turn outstanding bills into settled accounts.',
    author: {
      name: 'Julian Sterling',
      role: 'Former CFO & Independent Practice Advisor',
      avatar: 'JS',
    },
    content: `
### The Real Cost of Informal Invoicing

When you transition from salaried employment to independent consulting or freelance contracting, invoicing is frequently treated as an afterthought—a quick PDF scribbled together on a Friday evening. 

Yet for independent operators, **cash flow is your oxygen**. According to industry surveys, over 48% of freelancers suffer from persistent late payments, averaging 21 days past due. The vast majority of these delays are not caused by malicious clients, but by administrative friction: missing purchase order (PO) numbers, vague item descriptions, unclear payment routing instructions, or ambiguous due dates.

Here are the professional standards that top-tier consultants and boutique agencies enforce to guarantee fast settlement.

---

### 1. The Anatomy of a Bulletproof Invoice

To bypass bureaucratic accounting roadblocks in your client's accounts payable (AP) department, your invoice must contain zero ambiguity:

1. **Explicit Document Header:** Clearly state **"INVOICE"** (or "TAX INVOICE") in prominent typography at the top. Never use ambiguous titles like "Bill" or "Statement".
2. **Unique, Sequential Numbering:** Adopt an organized standard such as \`INV-YYYY-XXXX\` (e.g., \`INV-2026-0042\`). Never send \`Invoice #1\`—it communicates inexperience and confuses automated accounting scanners.
3. **Dual Dates (Issue & Hard Due Date):** Never write "Due in 30 days". Always write an absolute date: **"Due Date: October 14, 2026"**. Humans prioritize specific calendar deadlines over relative equations.
4. **Complete Entity Details:** Include full legal company names, physical addresses, contact telephone numbers, and your registered Tax ID (EIN, VAT, GST, or ABN). 
5. **Reference the Client's Purchase Order (PO):** If your client is a mid-sized company or enterprise, their AP system will reject any invoice lacking a registered PO number. Always ask for this up front.

---

### 2. Line Item Clarity: The "Audit-Proof" Standard

Clients hesitate to approve payments when line items are opaque. An invoice with a single line reading *"Website development - $5,000"* invites scrutiny from stakeholders who were not involved in daily communications.

Instead, separate your deliverables into clear, verifiable components:
- **Phase or Milestone Breakdown:** E.g., *"Sprint 1: Interactive Prototype & Figma Handoff (32 hours @ $125/hr)"*
- **Deliverables and Scope:** Mention what tangible outcome was delivered.
- **Pre-agreed Reimbursables:** Keep software licenses, stock photography, or server hosting on separate itemized lines accompanied by receipt references.

---

### 3. Choose the Right Payment Terms (and Enforce Them)

- **Due Upon Receipt:** Ideal for small retainers, initial deposits, or immediate project handoffs.
- **Net 14:** The modern sweet spot for digital agencies and freelancers. It grants clients sufficient time to run their weekly batch payment cycle without making you wait a whole calendar month.
- **Net 30:** The legacy corporate standard. If a client demands Net 30, negotiate a 30% to 50% upfront deposit before starting work.

**Late Fee Clauses:** Always stipulate your late policy in your payment terms:  
*"Late payments are subject to a 1.5% compounding finance fee per 30-day period (or the statutory maximum)."*  
Even if you choose to waive the fee as a courtesy, having it on the invoice provides massive leverage when following up on day 15.

---

### 4. Remove Friction from Payment Methods

Make it effortless for the client to send money. Don't simply say "Transfer to my bank account":
- Provide **Account Name, Routing Number (ACH), Account Number, and Swift/BIC**.
- State whether you accept credit card payments, digital wallets, or international wire transfers.
- Remind them to **"Quote Invoice # in transfer memo"** so their bank wire matches your invoice automatically.

By maintaining high corporate polish in your financial documentation, you command respect, reduce administrative hold-ups, and elevate your freelance business into a trusted vendor relationship.
    `,
  },
  {
    slug: 'how-to-get-paid-faster',
    title: 'How to Get Paid Faster: 7 Actionable Invoicing Tactics for Modern Businesses',
    category: 'Cash Flow Strategy',
    readingTime: '8 min read',
    publishDate: 'September 2026',
    excerpt: 'Tired of chasing clients 45 days after delivery? Discover psychological nudge tactics, automated reminder schedules, and deposit strategies that compress your days sales outstanding (DSO).',
    author: {
      name: 'Victoria Chen',
      role: 'SME Operations Consultant & Financial Author',
      avatar: 'VC',
    },
    content: `
### Days Sales Outstanding (DSO): The Metric That Makes or Breaks Service Businesses

In the financial world, **Days Sales Outstanding (DSO)** measures the average number of days it takes for a company to collect payment after a sale has been completed. For small businesses and freelancers, high DSO is the number one driver of liquidity crises.

When a client delays paying a $6,000 invoice by six weeks, you are effectively acting as their zero-interest bank. Meanwhile, your own obligations—rent, software subscriptions, contractor payouts, and taxes—remain non-negotiable.

Here are seven proven tactics to systematically reduce your DSO and get paid within days rather than months.

---

### 1. Require a 50% Retainer Before Starting Any Work

The single most effective way to eliminate payment risk is to never begin a project on a $0 balance. 

For projects under $10,000, adopt the industry standard:
- **50% upfront deposit** required before scheduling kickoff or discovery.
- **50% completion balance** due upon final asset delivery or staging review.

For longer, multi-month enterprise contracts, use milestone billing:
- **33% on agreement execution**
- **33% on midpoint milestone acceptance**
- **34% prior to final code deployment or asset transfer**

When clients have financial skin in the game, their internal feedback cycles accelerate dramatically.

---

### 2. Send Invoices Immediately Upon Milestone Completion

Human gratitude has a half-life. The moment you deliver a stunning design, deploy a web application, or deliver a comprehensive audit, your client's enthusiasm and perceived value are at their peak.

If you wait until the 30th of the month to send a batch invoice for work completed three weeks earlier, that psychological momentum has evaporated. The invoice is now viewed as an expense rather than an exciting achievement. **Send your invoice within 2 hours of delivery.**

---

### 3. Implement an Automated, Professional Follow-up Cadence

Chasing payments can feel awkward if handled emotionally. Remove personal awkwardness by establishing a predictable, systematic communication sequence:

- **7 Days Before Due Date:** A friendly check-in email.  
  *"Hi Marcus, hope the project launch is going smoothly! Quick reminder that invoice #INV-2026-0042 ($4,800) is scheduled for settlement next Tuesday. Let us know if your AP team requires any additional details."*
- **On the Due Date:** A brief notification with invoice attached.  
  *"Hi Marcus, invoice #INV-2026-0042 is due today. We've attached your PDF copy and direct banking details here for convenience."*
- **3 Days Overdue:** The gentle nudge.  
  *"Following up on invoice #INV-2026-0042 which reached its term on Oct 14. Could you confirm when payment will be processed this week?"*
- **10 Days Overdue:** The executive escalation.  
  *"Per our service agreement, accounts past 10 days are subject to late assessment and project pausing. Please advise on wire confirmation."*

Treat this process with calm, professional neutrality. You provided excellent service; expecting timely compensation is standard business etiquette.

---

### 4. Incentivize Early Payments with a 2/10 Net 30 Discount

One of corporate accounting's oldest and most effective levers is the **"2/10 Net 30"** discount:
- The full invoice is due in 30 days.
- However, if the client settles within **10 days**, they receive a **2% discount**.

On an $8,000 invoice, a 2% discount ($160) is an attractive return for a corporate finance team with excess working capital. For you, sacrificing $160 to gain $7,840 three weeks early is vastly cheaper than short-term credit lines or factoring loans.

---

### 5. Retain Deliverable Assets Until Final Receipt

Never hand over root administrator credentials, production DNS records, or vector source copyright assignments until the final invoice has cleared.

In web development, host the staging review on your private sandbox server. In design, deliver watermarked client review proofs or read-only Figma prototypes. Once the final invoice is paid and the receipt is issued, immediately transfer all master source files with a formal written release.

---

### 6. Make Electronic Payment Frictionless

If your only payment method is a paper cheque sent via postal mail, expect a 30-day delay. Today's businesses expect:
- Direct ACH / domestic bank transfers with one-click routing.
- Credit card payment options (with processing surcharge absorbed into your pricing structure).
- Instant SEPA or Wire transfers for cross-border transactions.

Every extra hurdle between your client's decision to pay and the money hitting your account adds 3–5 days of latency.

---

### 7. Know When to Stop Work

If a client has an overdue invoice, **do not continue working on future milestones**. 

Continuing to supply labor while previous invoices remain unpaid sends a clear signal that your deadlines can be disregarded without consequence. A polite, firm email:
*"We are excited to dive into Phase 3. As soon as invoice #42 is settled, our schedule will immediately open for this upcoming milestone."*  
Watch how fast their accounts payable department resolves the hold.
    `,
  },
  {
    slug: 'payment-terms-net-15-net-30-explained',
    title: 'Standard Payment Terms Explained: When to Use Net 15, Net 30, and Due on Receipt',
    category: 'Contract & Compliance',
    readingTime: '5 min read',
    publishDate: 'September 2026',
    excerpt: 'Decoding payment terms for modern service providers. Understand the legal mechanics, cash-flow implications, and negotiation tactics for Net 15, Net 30, Net 60, and CIA.',
    author: {
      name: 'David Rosenthal',
      role: 'Commercial Contract Specialist',
      avatar: 'DR',
    },
    content: `
### What Do Invoice Payment Terms Actually Mean?

Payment terms dictate both the **timeline** and **conditions** under which an invoice must be satisfied. In commercial business-to-business (B2B) trade, standard terms represent a contractual agreement backed by commercial law.

Selecting the wrong payment terms can leave you trapped in cash flow starvation, while selecting terms that conflict with your client's corporate structure can result in endless administrative confusion.

Let's dissect the primary terms used by modern freelancers, contractors, and agencies.

---

### 1. Due Upon Receipt

**Definition:** The payment is legally due the exact day the invoice is delivered to the client.

- **Best for:** Initial retainers, one-off consulting sessions, small-ticket digital deliverables, or clients with no established credit history.
- **Advantages:** Fastest possible cash cycle. Eliminates arbitrary waiting periods.
- **Disadvantages:** Large enterprises rarely operate on "due upon receipt" because their finance departments process invoices on fixed weekly or bi-weekly disbursement runs.

---

### 2. Net 15 (or Net 14)

**Definition:** Full payment must be settled within 14 to 15 calendar days of the invoice issue date.

- **Best for:** Independent contractors, agile agencies, SaaS onboarding, and standard professional services.
- **Why it works:** Net 14/15 allows the client's finance manager to run the invoice through their standard weekly review, without forcing the contractor to wait a full calendar month. It is widely considered the gold standard for modern freelance agreements.

---

### 3. Net 30

**Definition:** Payment is due within 30 calendar days of the invoice date.

- **Best for:** Corporate B2B clients, enterprise engagements, government contractors, and large institutional buyers.
- **Caveat:** Be aware that "Net 30" in enterprise environments often translates into 35–45 real days due to batch billing cycles. If accepting Net 30 terms, ensure your project pricing includes an adequate margin to finance the 30-day float.

---

### 4. Net 60 & Net 90: Danger Zones for Small Businesses

**Definition:** Payment is withheld for 60 or 90 calendar days.

- **Who demands this:** Fortune 500 corporations, big-box retailers, and multi-tier advertising conglomerates.
- **The Risk:** Unless you possess substantial liquid reserves, Net 60 and Net 90 terms can push a small business into insolvency.
- **Negotiation Strategy:** If an enterprise client insists on Net 60 as corporate policy, propose a 3% to 5% surcharge for extended terms, or demand a larger upfront deposit (e.g., 40%) paid on Net 15 terms to mitigate your risk.

---

### Summary Comparison Table

| Payment Term | Typical Settlement Window | Recommended Risk Profile | Ideal Client Type |
| :--- | :--- | :--- | :--- |
| **Due Upon Receipt** | 1 – 3 Days | Zero Credit Risk | First-time clients, retainers |
| **Net 14 / Net 15** | 10 – 16 Days | Low Risk | Small-to-mid businesses, standard agency work |
| **Net 30** | 28 – 35 Days | Moderate Risk | Established corporations with verified credit |
| **2/10 Net 30** | 7 – 10 Days | Low Risk | Clients with cash-rich balance sheets |
| **Net 60+** | 60 – 75 Days | High Risk | Only when supported by upfront deposits |

Establishing clear payment terms right from your project quotation sets a precedent of corporate discipline and ensures both parties respect the financial partnership.
    `,
  },
  {
    slug: 'tax-deductions-and-financial-recordkeeping',
    title: 'Essential Financial Recordkeeping: Keeping Invoices & Receipts Audit-Ready',
    category: 'Tax & Compliance',
    readingTime: '7 min read',
    publishDate: 'September 2026',
    excerpt: 'Demystifying small business tax documentation. Learn how to maintain clean paper trails, understand write-off rules, and keep your accounting spotless with compliant receipts.',
    author: {
      name: 'Julian Sterling',
      role: 'Former CFO & Independent Practice Advisor',
      avatar: 'JS',
    },
    content: `
### Why Good Recordkeeping Is Your Most Valuable Asset

When tax season arrives, disorganized documentation turns financial planning into a high-stress scramble. Worse, when an auditor or tax authority examines your books, the burden of proof rests entirely on you.

Without compliant, verifiable documentation, tax authorities can summarily disqualify valid business deductions—costing you thousands of dollars in unexpected liabilities, penalties, and back taxes.

Here is what it takes to maintain an airtight, audit-ready financial system for your independent business.

---

### Invoices vs. Receipts: The Crucial Difference

Many small business owners conflate invoices with receipts, but tax authorities treat them with distinct legal significance:

- **An Invoice is a Request for Payment:** It proves that work was billed and an account receivable was created. However, on an accrual or cash accounting basis, an invoice alone does not prove that money actually changed hands.
- **A Receipt is Proof of Payment:** A formal receipt establishes that consideration was exchanged, citing the transaction date, exact currency amount, payment method (credit card, wire transfer, check), and transaction or authorization ID.

To withstand an audit, every deduction claimed on your tax return must be substantiated by a **receipt** or verified electronic proof of purchase, rather than simply an unconfirmed quote or bill.

---

### What Makes a Document "Audit-Compliant"?

According to IRS guidelines and international tax conventions (HMRC, CRA, ATO), a valid receipt or invoice must contain five essential data points:

1. **Vendor Identification:** Full legal business name, address, and contact details.
2. **Date of Transaction:** The precise date goods or services were purchased or settled.
3. **Itemized Description:** What was purchased. Generic descriptions like "supplies" are frequently challenged; specific entries like "Dell UltraSharp 27-inch 4K Monitor" or "Web Server Cloud Hosting (Sept 2026)" pass without issue.
4. **Amount & Applicable Taxes:** The item subtotal, itemized sales tax (VAT/GST), and total consideration paid.
5. **Method of Payment:** Details showing how the expense was satisfied (e.g., "Paid via Mastercard ending in 8831").

---

### The 7-Year Digital Archive Rule

Most legal and tax jurisdictions recommend preserving all financial records, invoices, customer receipts, and contractor agreements for a minimum of **7 years**.

With **InvoiceGen Pro**, all your documents can be exported directly to high-resolution vector PDF format. By creating a standardized folder hierarchy on your local encrypted storage:
- \`Finances/2026/Invoices_Issued/\`
- \`Finances/2026/Receipts_Given/\`
- \`Finances/2026/Vendor_Expenses/\`

You create a permanent, tamper-resistant archive that can be reviewed at a moment's notice by your CPA or tax advisor.
    `,
  },
];
