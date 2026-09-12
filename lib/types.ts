export type DocumentType = 'invoice' | 'quote' | 'receipt';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  taxable: boolean;
  amount: number;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
}

export interface DocumentData {
  type: DocumentType;
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  validUntil: string;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  poNumber: string;
  currency: CurrencyConfig;
  status: 'draft' | 'sent' | 'paid' | 'overdue';

  // Sender details
  senderName: string;
  senderBusiness: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderCityStateZip: string;
  senderTaxId: string;
  logoDataUrl?: string;

  // Client details
  clientBusiness: string;
  clientContact: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientCityStateZip: string;
  clientTaxId: string;

  // Line items
  items: LineItem[];

  // Financials
  taxRate: number;
  taxLabel: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  shipping: number;
  amountPaid: number;

  // Payment / Banking
  paymentTerms: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingIban: string;
  swiftBic: string;
  additionalPaymentInfo: string;

  // Notes & Sign-off
  notes: string;
  terms: string;
  signatureName: string;
  signatureTitle: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
}
