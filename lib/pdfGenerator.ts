import { jsPDF } from 'jspdf';
import { DocumentData } from './types';

export function calculateTotals(doc: DocumentData) {
  const subtotal = doc.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  let discountAmount = 0;
  if (doc.discountValue > 0) {
    if (doc.discountType === 'percentage') {
      discountAmount = (subtotal * doc.discountValue) / 100;
    } else {
      discountAmount = Number(doc.discountValue) || 0;
    }
  }

  const taxableBase = Math.max(0, subtotal - discountAmount);
  const taxAmount = doc.taxRate > 0 ? (taxableBase * doc.taxRate) / 100 : 0;
  const shippingAmount = Number(doc.shipping) || 0;
  const total = Math.max(0, taxableBase + taxAmount + shippingAmount);
  const amountPaid = doc.type === 'receipt' ? total : (Number(doc.amountPaid) || 0);
  const balanceDue = Math.max(0, total - amountPaid);

  return {
    subtotal,
    discountAmount,
    taxAmount,
    shippingAmount,
    total,
    amountPaid,
    balanceDue,
  };
}

export function formatMoney(amount: number, symbol: string = '$'): string {
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateDocumentPDF(doc: DocumentData) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const totals = calculateTotals(doc);
  const symbol = doc.currency?.symbol || '$';
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const navyDark = [15, 23, 42] as const; // #0F172A
  const navyMedium = [30, 41, 59] as const; // #1E293B
  const gold = [180, 83, 9] as const; // #B45309 (Amber 700)
  const slateText = [71, 85, 105] as const; // #475569
  const lightBg = [248, 250, 252] as const; // #F8FAFC
  const borderGrey = [226, 232, 240] as const; // #E2E8F0

  let curY = margin;

  // Top Accent Bar (Navy & Gold)
  pdf.setFillColor(navyDark[0], navyDark[1], navyDark[2]);
  pdf.rect(0, 0, pageWidth, 6, 'F');
  pdf.setFillColor(gold[0], gold[1], gold[2]);
  pdf.rect(0, 6, pageWidth, 1.5, 'F');

  curY = 18;

  // Header Section: Logo & Document Title
  const hasLogo = Boolean(doc.logoDataUrl && doc.logoDataUrl.startsWith('data:image'));
  let logoOffset = 0;

  if (hasLogo && doc.logoDataUrl) {
    try {
      pdf.addImage(doc.logoDataUrl, 'PNG', margin, curY, 32, 16);
      logoOffset = 20;
    } catch {
      // Fallback if image format fails
      logoOffset = 0;
    }
  }

  // Document Title & Number (Right Aligned)
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  const docTitle = doc.type === 'invoice' ? 'INVOICE' : doc.type === 'quote' ? 'ESTIMATE / QUOTE' : 'OFFICIAL RECEIPT';
  pdf.text(docTitle, pageWidth - margin, curY + 6, { align: 'right' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text(`# ${doc.number || 'DOC-001'}`, pageWidth - margin, curY + 12, { align: 'right' });

  // Status Pill
  const statusLabel = doc.status ? doc.status.toUpperCase() : 'ISSUED';
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  const statusWidth = 24;
  const statusX = pageWidth - margin - statusWidth;
  const statusY = curY + 15;
  pdf.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  pdf.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  pdf.roundedRect(statusX, statusY, statusWidth, 6, 1.5, 1.5, 'FD');
  pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  pdf.text(statusLabel, statusX + statusWidth / 2, statusY + 4.2, { align: 'center' });

  // Business Name under logo or header
  curY += Math.max(logoOffset, 12);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  pdf.text(doc.senderBusiness || doc.senderName || 'Your Business Name', margin, curY);

  curY += 5;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(slateText[0], slateText[1], slateText[2]);

  if (doc.senderName && doc.senderBusiness) {
    pdf.text(doc.senderName, margin, curY);
    curY += 4;
  }
  if (doc.senderAddress) {
    pdf.text(doc.senderAddress, margin, curY);
    curY += 4;
  }
  if (doc.senderCityStateZip) {
    pdf.text(doc.senderCityStateZip, margin, curY);
    curY += 4;
  }
  const senderContact = [doc.senderEmail, doc.senderPhone].filter(Boolean).join('  |  ');
  if (senderContact) {
    pdf.text(senderContact, margin, curY);
    curY += 4;
  }
  if (doc.senderTaxId) {
    pdf.setFont('helvetica', 'bold');
    pdf.text(doc.senderTaxId, margin, curY);
    curY += 5;
  }

  curY += 4;

  // Horizontal subtle divider
  pdf.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  pdf.setLineWidth(0.3);
  pdf.line(margin, curY, pageWidth - margin, curY);
  curY += 6;

  // Two-column metadata block: [Bill To / Client Info] & [Document Dates & Specs]
  const colWidth = (contentWidth - 10) / 2;
  const col1X = margin;
  const col2X = margin + colWidth + 10;
  const metaStartY = curY;

  // Left: Client Details
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text(doc.type === 'quote' ? 'ESTIMATE PREPARED FOR' : doc.type === 'receipt' ? 'RECEIPT ISSUED TO' : 'BILLED TO', col1X, curY);

  curY += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10.5);
  pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  pdf.text(doc.clientBusiness || doc.clientContact || 'Client Company / Individual', col1X, curY);

  curY += 4.5;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(slateText[0], slateText[1], slateText[2]);

  if (doc.clientContact && doc.clientBusiness) {
    pdf.text(`Attn: ${doc.clientContact}`, col1X, curY);
    curY += 4;
  }
  if (doc.clientAddress) {
    pdf.text(doc.clientAddress, col1X, curY);
    curY += 4;
  }
  if (doc.clientCityStateZip) {
    pdf.text(doc.clientCityStateZip, col1X, curY);
    curY += 4;
  }
  const clientContact = [doc.clientEmail, doc.clientPhone].filter(Boolean).join('  |  ');
  if (clientContact) {
    pdf.text(clientContact, col1X, curY);
    curY += 4;
  }
  if (doc.clientTaxId) {
    pdf.text(doc.clientTaxId, col1X, curY);
    curY += 4;
  }

  const leftBottom = curY;

  // Right: Document Parameters
  curY = metaStartY;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.text('DOCUMENT PARTICULARS', col2X, curY);
  curY += 5;

  const dateItems: { label: string; value: string }[] = [];
  dateItems.push({ label: 'Issue Date:', value: doc.issueDate || '—' });

  if (doc.type === 'invoice') {
    dateItems.push({ label: 'Payment Due:', value: doc.dueDate || 'Upon Receipt' });
    if (doc.poNumber) dateItems.push({ label: 'P.O. Number:', value: doc.poNumber });
    if (doc.paymentTerms) dateItems.push({ label: 'Terms:', value: doc.paymentTerms });
  } else if (doc.type === 'quote') {
    dateItems.push({ label: 'Valid Until:', value: doc.validUntil || '30 Days from Issue' });
    if (doc.poNumber) dateItems.push({ label: 'Project Code:', value: doc.poNumber });
  } else if (doc.type === 'receipt') {
    dateItems.push({ label: 'Payment Date:', value: doc.paymentDate || doc.issueDate || '—' });
    dateItems.push({ label: 'Payment Method:', value: doc.paymentMethod || 'Settled' });
    if (doc.transactionId) dateItems.push({ label: 'Transaction ID:', value: doc.transactionId });
  }

  for (const item of dateItems) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(navyMedium[0], navyMedium[1], navyMedium[2]);
    pdf.text(item.label, col2X, curY);

    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(slateText[0], slateText[1], slateText[2]);
    pdf.text(item.value, col2X + 32, curY);
    curY += 4.5;
  }

  curY = Math.max(leftBottom, curY) + 6;

  // Line Items Table Header
  const tableHeaderY = curY;
  const headerHeight = 7;
  pdf.setFillColor(navyDark[0], navyDark[1], navyDark[2]);
  pdf.rect(margin, tableHeaderY, contentWidth, headerHeight, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(255, 255, 255);

  const colDescX = margin + 3;
  const colQtyX = margin + contentWidth - 75;
  const colRateX = margin + contentWidth - 45;
  const colTotalX = margin + contentWidth - 3;

  pdf.text('ITEM / SERVICE DESCRIPTION', colDescX, tableHeaderY + 4.8);
  pdf.text('QTY', colQtyX, tableHeaderY + 4.8, { align: 'right' });
  pdf.text('RATE', colRateX, tableHeaderY + 4.8, { align: 'right' });
  pdf.text('AMOUNT', colTotalX, tableHeaderY + 4.8, { align: 'right' });

  curY += headerHeight;

  // Table Body Rows
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);

  doc.items.forEach((item, index) => {
    // Check if new page needed
    if (curY > pageHeight - 65) {
      pdf.addPage();
      curY = 20;
    }

    const rowBg = index % 2 === 1;
    if (rowBg) {
      pdf.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      pdf.rect(margin, curY, contentWidth, 8, 'F');
    }

    pdf.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    pdf.setLineWidth(0.2);
    pdf.line(margin, curY + 8, margin + contentWidth, curY + 8);

    pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
    const cleanDesc = item.description || 'Service item';
    // Truncate description if too wide for one line in PDF table
    const splitDesc = pdf.splitTextToSize(cleanDesc, contentWidth - 85);
    pdf.text(splitDesc[0], colDescX, curY + 5.2);

    pdf.setTextColor(slateText[0], slateText[1], slateText[2]);
    pdf.text(String(item.quantity || 1), colQtyX, curY + 5.2, { align: 'right' });
    pdf.text(formatMoney(Number(item.rate) || 0, symbol), colRateX, curY + 5.2, { align: 'right' });

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
    pdf.text(formatMoney(Number(item.amount) || 0, symbol), colTotalX, curY + 5.2, { align: 'right' });
    pdf.setFont('helvetica', 'normal');

    curY += 8;
  });

  curY += 4;

  // Summary and Totals Section (Right Side)
  const totalsWidth = 72;
  const totalsX = margin + contentWidth - totalsWidth;
  const totalsStartY = curY;

  const summaryLines: { label: string; value: string; isBold?: boolean; isHighlight?: boolean }[] = [
    { label: 'Subtotal', value: formatMoney(totals.subtotal, symbol) },
  ];

  if (totals.discountAmount > 0) {
    const discLabel = doc.discountType === 'percentage' ? `Discount (${doc.discountValue}%)` : 'Discount';
    summaryLines.push({ label: discLabel, value: `-${formatMoney(totals.discountAmount, symbol)}` });
  }

  if (totals.taxAmount > 0 || doc.taxRate > 0) {
    summaryLines.push({ label: doc.taxLabel || `Tax (${doc.taxRate}%)`, value: formatMoney(totals.taxAmount, symbol) });
  }

  if (totals.shippingAmount > 0) {
    summaryLines.push({ label: 'Shipping / Handling', value: formatMoney(totals.shippingAmount, symbol) });
  }

  summaryLines.push({
    label: doc.type === 'receipt' ? 'Total Paid' : 'Total Amount',
    value: formatMoney(totals.total, symbol),
    isBold: true,
    isHighlight: true,
  });

  if (doc.type === 'invoice' && totals.amountPaid > 0) {
    summaryLines.push({ label: 'Amount Paid', value: formatMoney(totals.amountPaid, symbol) });
    summaryLines.push({ label: 'Balance Due', value: formatMoney(totals.balanceDue, symbol), isBold: true });
  }

  // Draw Summary Table
  let sumY = totalsStartY;
  for (const line of summaryLines) {
    if (line.isHighlight) {
      pdf.setFillColor(navyDark[0], navyDark[1], navyDark[2]);
      pdf.rect(totalsX - 4, sumY - 1, totalsWidth + 4, 7, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(255, 255, 255);
      pdf.text(line.label, totalsX, sumY + 4);
      pdf.text(line.value, margin + contentWidth - 2, sumY + 4, { align: 'right' });
      sumY += 8;
    } else {
      pdf.setFont('helvetica', line.isBold ? 'bold' : 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(line.isBold ? navyDark[0] : slateText[0], line.isBold ? navyDark[1] : slateText[1], line.isBold ? navyDark[2] : slateText[2]);
      pdf.text(line.label, totalsX, sumY + 3.5);
      pdf.text(line.value, margin + contentWidth - 2, sumY + 3.5, { align: 'right' });
      sumY += 5.5;
    }
  }

  // Left Side: Payment Instructions & Banking (if invoice or quote)
  curY = totalsStartY;
  const leftBoxWidth = contentWidth - totalsWidth - 12;

  if (doc.bankName || doc.accountNumber || doc.additionalPaymentInfo) {
    pdf.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    pdf.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    pdf.roundedRect(margin, curY, leftBoxWidth, 26, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(gold[0], gold[1], gold[2]);
    pdf.text(doc.type === 'receipt' ? 'TRANSACTION SETTLEMENT RECORD' : 'BANKING & PAYMENT REMITTANCE', margin + 3.5, curY + 4.5);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(slateText[0], slateText[1], slateText[2]);

    let bankY = curY + 8.5;
    if (doc.bankName) {
      pdf.text(`Bank: ${doc.bankName}`, margin + 3.5, bankY);
      bankY += 3.5;
    }
    if (doc.accountName) {
      pdf.text(`Account Name: ${doc.accountName}`, margin + 3.5, bankY);
      bankY += 3.5;
    }
    const accStr = [
      doc.accountNumber ? `Acc: ${doc.accountNumber}` : '',
      doc.routingIban ? `Routing/IBAN: ${doc.routingIban}` : '',
      doc.swiftBic ? `SWIFT: ${doc.swiftBic}` : '',
    ].filter(Boolean).join('   ');
    if (accStr) {
      pdf.text(accStr, margin + 3.5, bankY);
      bankY += 3.5;
    }
    if (doc.additionalPaymentInfo) {
      pdf.text(doc.additionalPaymentInfo, margin + 3.5, bankY);
    }
  }

  curY = Math.max(sumY, curY + 30) + 4;

  // Notes and Terms
  if (doc.notes) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
    pdf.text('NOTES & REMARKS:', margin, curY);
    curY += 4;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(slateText[0], slateText[1], slateText[2]);
    const splitNotes = pdf.splitTextToSize(doc.notes, contentWidth);
    pdf.text(splitNotes, margin, curY);
    curY += splitNotes.length * 3.5 + 2;
  }

  if (doc.terms) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
    pdf.text('TERMS & CONDITIONS:', margin, curY);
    curY += 4;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(slateText[0], slateText[1], slateText[2]);
    const splitTerms = pdf.splitTextToSize(doc.terms, contentWidth);
    pdf.text(splitTerms, margin, curY);
    curY += splitTerms.length * 3.5 + 2;
  }

  // Sign-off / Signature section if present
  if (doc.signatureName) {
    curY += 2;
    pdf.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    pdf.line(margin, curY + 6, margin + 50, curY + 6);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
    pdf.text(doc.signatureName, margin, curY + 10);
    if (doc.signatureTitle) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(slateText[0], slateText[1], slateText[2]);
      pdf.text(doc.signatureTitle, margin, curY + 13.5);
    }
  }

  // Footer bar
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(slateText[0], slateText[1], slateText[2]);
  pdf.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  pdf.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  pdf.text('InvoiceGen Pro — B2B Financial Document Engine  |  Confidential & Legally Binding', margin, pageHeight - 8);
  pdf.text('Page 1 of 1', pageWidth - margin, pageHeight - 8, { align: 'right' });

  // Trigger download
  const filename = `${doc.type.toUpperCase()}-${doc.number || 'DOC'}.pdf`;
  pdf.save(filename);
}
