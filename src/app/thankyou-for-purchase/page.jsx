'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../status/thank.css';
import './thankyou.css';

export default function Page() {
  const user = useSelector((state) => state.user);
  const invoiceRef = useRef(null);
const lastInvoice = user?.invoices
  ?.slice()
  ?.sort((a, b) => {
    const numA = parseInt(a.invoiceNumber.split('-')[2], 10);
    const numB = parseInt(b.invoiceNumber.split('-')[2], 10);
    return numB - numA;
  })[0];


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

  const downloadPDF = async (e) => {
    e?.preventDefault();
    if (!invoiceRef.current || !lastInvoice) return;
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    pdf.save(`${lastInvoice.invoiceNumber}.pdf`);
 
  };

  // useEffect(() => {
  //   if (lastInvoice) {
  //     setTimeout(downloadPDF, 500); // Download and preview on mount
  //   }
  // }, [lastInvoice]);

  return (
    <div className="verify-container thankscont">
      <div className="verify-box">
        <div className="receipt-header">
          <h1 className="company-title">Xclusive 3D</h1>
          <h2>Payment Confirmation</h2>
        </div>

        <FaCheckCircle size={60} color="#ff8c2f" />
        <p>Your payment was successful. Please enjoy the Xclusive3D conversion service.</p>
  <div className="invoice-download-btn-wrap">
  <button className="download-btn-success" onClick={downloadPDF}>
    Download Invoice
  </button>
  <Link href="/upload">
    <button className="upload-btn">Start 3D processing</button>
  </Link>
</div>

       <div className='specialinvoicewrapper'>
         {lastInvoice && (
          <div className="invoice-preview thankpageinvoice" ref={invoiceRef}>
            <div className="invoice-top-border" />
            <div className="spaced-div">
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
    NL002166652B18
  </strong>
</div>
<div className="lightBlueColored">CoC: 34270611</div>
<div className="lightBlueColored">The Netherlands</div>

                </div>
              </div>

              <div className="invoice-info-right">
                <div className="billing-block">
                  <div>{lastInvoice.billingInfo.name}</div>
                  <div>{lastInvoice.billingInfo.companyName}</div>
                  <div>
                    {lastInvoice.billingInfo.street}<br />
                    {lastInvoice.billingInfo.postalCode}{" "}
                    {lastInvoice.billingInfo.city}{" "}<br />
                    The {lastInvoice.billingInfo.countryName}
                  </div>

                  <div className="invoice-meta">
                   
                
                    <div className="meta-row">
                      <div className="meta-label">VAT Number:</div>
                      <div className="meta-value">
                       {lastInvoice.billingInfo.vatNumber
      ? lastInvoice.billingInfo.vatNumber
      : "Not provided"}
                      </div>
                    </div>
                    <div className="meta-row">
                      <div className="meta-label">Date:</div>
                      <div className="meta-value">
                        {new Date(lastInvoice.issuedAt).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                    <div className="meta-row">
                      <div className="meta-label">Invoice Number:</div>
                      <div className="meta-value">{lastInvoice.invoiceNumber}</div>
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
    {groupCredits(lastInvoice.credits).map((c, idx) => (
      <tr key={idx}>
        <td>{c.credits} Credits for 3d conversion</td>
        <td>{c.quantity}</td>
        <td>{lastInvoice.currency} {c.amount.toFixed(2).replace('.', ',')}</td>
      </tr>
    ))}

    {/* Empty spacing rows */}
    <tr style={{borderBottom:'2px solid #000'}}>
      <td  style={{ height: "45px" }}></td>
       <td  style={{ height: "45px" }}></td>
        <td  style={{ height: "45px" }}></td>
    </tr>
    
    {/* Subtotal */}
    <tr>
      <td></td>
      <td> </td>
      <td>{lastInvoice.currency} {lastInvoice.amount.toFixed(2).replace('.', ',')}</td>
    </tr>

    {/* VAT Row */}
    {(lastInvoice.vat > 0 || lastInvoice.vatRate > 0) && (
      <tr>
        <td></td>
        <td>VAT</td>
        <td>{lastInvoice.currency} {lastInvoice.vat.toFixed(2).replace('.', ',')}</td>
      </tr>
    )}

    {/* Total */}
    <tr className="total" style={{borderBottom:'2px solid #000'}}>
      <td></td>
      <td></td>
      <td>{lastInvoice.currency} {lastInvoice.total.toFixed(2).replace('.', ',')}</td>
    </tr>
  </tbody>
</table>

                  <div className="invoice-footer">
                    {lastInvoice.vatNote != "" ? "VAT Reversed" : ""} <br />
                    Payment method: {lastInvoice.method} <br />
                    Credits are valid for 1 year (365 days) <br />
                    Thank you for your order and enjoy our immersive 3D conversion.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

       </div>
    
      </div>
    </div>
  );
}
