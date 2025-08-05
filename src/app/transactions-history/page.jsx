'use client';

import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Transactionshistory.css';

const TransactionsHistory = () => {
  const user = useSelector((state) => state.user);
  const invoices = user?.invoices || [];

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoiceRef = useRef(null);

  const groupCredits = (credits = []) => {
    const map = new Map();
    credits.forEach(c => {
      const key = `${c.credits}-${c.amount}`;
      if (!map.has(key)) {
        map.set(key, { credits: c.credits, amount: c.amount, quantity: 1 });
      } else {
        map.get(key).quantity += 1;
      }
    });
    return [...map.values()];
  };

  const renderAndDownloadInvoice = async (invoice) => {
    setSelectedInvoice(invoice);
    setTimeout(async () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

      // Delay to ensure DOM is updated/rendered
      await new Promise((res) => setTimeout(res, 500));

      if (!invoiceRef.current) return;

      const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${invoice.invoiceNumber}.pdf`);
    }, 100); // slight delay before capture
  };

  return (
    <div className='transaction-history-wrap'>
      <h2 className="transactions-title">Invoices</h2>
      <div className="transactions-container">
        {invoices.length === 0 ? (
          <p className="no-transactions">You have not made any purchases yet.</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Date</th>
                <th>Invoice #</th>
                <th>Amount</th>
                <th>Credits</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {[...invoices].reverse().map((inv, index) => {
                const totalCredits = inv.credits.reduce((sum, c) => sum + (c.credits || 0), 0);
                return (
                  <tr key={inv._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(inv.issuedAt).toLocaleDateString()}</td>
                    <td>{inv.invoiceNumber}</td>
                    <td>{inv.currency} {inv.total.toFixed(2)}</td>
                    <td>{totalCredits}</td>
                    <td>
                      <FaDownload
                        className="download-icon"
                        title="View & Download Invoice"
                        onClick={() => renderAndDownloadInvoice(inv)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className='specialinvoicewrapper'>
      {selectedInvoice && (
        <div>
          <div className="invoice-preview" ref={invoiceRef}>
            <div className="invoice-top-border" />
            <div className='spaced-div'>
              <div className="invoice-logo">XCLUSIVE 3D</div>
              <img src="/logoMain.png" alt="logo" className="invoice-logo-img" />
            </div>

            <div className="invoice-header">
              <div className="invoice-info-left">
                <div className="invoice-title">INVOICE</div>
                <div className="invoice-contact">
                  <div>info@Xclusive3d.com</div>
                 <div className="blueColored">
  VAT number:{" "}<br />
  <strong>
    {selectedInvoice.billingInfo.vatNumber
      ? selectedInvoice.billingInfo.vatNumber
      : "Not provided"}
  </strong>
</div>
<div className="lightBlueColored">CoC: 34270611</div>

                </div>
              </div>

              <div className="invoice-info-right">
                <div className="billing-block">
                  <div>{selectedInvoice.billingInfo.name}</div>
                  {selectedInvoice.billingInfo.companyName && (
                    <div>{selectedInvoice.billingInfo.companyName}</div>
                  )}
                  <div>
                    {selectedInvoice.billingInfo.street},{" "}
                    {selectedInvoice.billingInfo.postalCode}{" "}
                    {selectedInvoice.billingInfo.city},{" "}
                    {selectedInvoice.billingInfo.countryName}
                  </div>

                  <div className="invoice-meta">
                    <div className="meta-row">
                      <div className="meta-label">Date:</div>
                      <div className="meta-value">
                        {new Date(selectedInvoice.issuedAt).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                    <div className="meta-row">
                      <div className="meta-label">Invoice Number:</div>
                      <div className="meta-value">{selectedInvoice.invoiceNumber}</div>
                    </div>
                  </div>

                  <table className="invoice-table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupCredits(selectedInvoice.credits).map((c, idx) => (
                        <tr key={idx}>
                          <td>{c.credits} Credits for 3d conversion</td>
                          <td>{c.quantity}</td>
                          <td>{selectedInvoice.currency} {c.amount.toFixed(2).replace('.', ',')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table className="invoice-summary">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td>{selectedInvoice.currency} {selectedInvoice.amount.toFixed(2).replace('.', ',')}</td>
                      </tr>
                      <tr>
                        <td>VAT</td>
                        <td>{selectedInvoice.currency} {selectedInvoice.vat.toFixed(2).replace('.', ',')}</td>
                      </tr>
                      <tr className="total">
                        <td>Total</td>
                        <td>{selectedInvoice.currency} {selectedInvoice.total.toFixed(2).replace('.', ',')}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="invoice-footer">
                    Payment method: {selectedInvoice.method} <br />
                    Credits are valid for 1 year (365 days) <br />
                    Thank you for your order and enjoy our immersive 3D conversion.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}</div>
    </div>
  );
};

export default TransactionsHistory;
