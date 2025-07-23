'use client';

import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import '../status/thank.css';
import './thankyou.css';

export default function Page() {
  const user = useSelector((state) => state.user);

  const lastCredit = user?.wallet?.transactions
    ?.filter((t) => t.type === 'credit' && t.billingInfo)
    ?.slice(-1)[0];

  const generatePDF = () => {
    if (!lastCredit || !user) return;

    const billing = lastCredit.billingInfo;
    const date = new Date(lastCredit.createdAt).toLocaleString();
    const doc = new jsPDF();

    // Header branding
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Xclusive 3D', 105, 20, null, null, 'center');

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Payment Receipt', 105, 30, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Customer: ${user.firstName} ${user.lastName}`, 20, 50);
    doc.text(`Email: ${user.email}`, 20, 58);
    doc.text(`Country: ${user.country}`, 20, 66);

    doc.text('Billing Information:', 20, 82);
    doc.text(`Street: ${billing.street}`, 20, 90);
    doc.text(`City: ${billing.city}`, 20, 98);
    doc.text(`Postal Code: ${billing.postalCode}`, 20, 106);
    doc.text(`Country: ${billing.country}`, 20, 114);
    doc.text(`Company: ${billing.companyName || '-'}`, 20, 122);
    doc.text(`VAT Number: ${billing.vatNumber || '-'}`, 20, 130);

    doc.text('Transaction Details:', 20, 146);
    doc.text(`Date: ${date}`, 20, 154);
    doc.text(`Description: ${lastCredit.description}`, 20, 162);
   doc.text(`Amount: €${lastCredit.amount.toFixed(2)} EUR`, 20, 170);
doc.text(`Transaction ID: ${lastCredit._id}`, 20, 186);
doc.text(`Stripe Payment ID: ${lastCredit.stripePayment.id || '-'}`, 20, 194);


    doc.save(`receipt_${user.firstName}.pdf`);
  };

  return (
    <div className="verify-container thankscont">
      <div className="verify-box">
        <div className="receipt-header">
          <h1 className="company-title">Xclusive 3D</h1>
          <h2>Payment Confirmation</h2>
        </div>

        <FaCheckCircle size={60} color="#ff8c2f" />
        <p>Your payment was successful. Please enjoy the Xclusive3D conversion service.</p>

        {lastCredit && (
          <div className="receipt-box">
            <h3>Receipt Summary</h3>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Country:</strong> {user.country}</p>

            <p><strong>Street:</strong> {lastCredit.billingInfo.street}</p>
            <p><strong>City:</strong> {lastCredit.billingInfo.city}</p>
            <p><strong>Postal Code:</strong> {lastCredit.billingInfo.postalCode}</p>
            <p><strong>Company:</strong> {lastCredit.billingInfo.companyName || '-'}</p>
            <p><strong>VAT Number:</strong> {lastCredit.billingInfo.vatNumber || '-'}</p>

            <p><strong>Date:</strong> {new Date(lastCredit.createdAt).toLocaleString()}</p>
            <p><strong>Description:</strong> {lastCredit.description}</p>
          <p><strong>Amount:</strong> €{lastCredit.amount.toFixed(2)} EUR</p>
<p><strong>Transaction ID:</strong> {lastCredit._id}</p>
<p><strong>Stripe Payment ID:</strong> {lastCredit.stripePayment.id || '-'}</p>


            <button className="login-btn" onClick={generatePDF}>Download Receipt</button>
          </div>
        )}

        <Link href="/upload">
          <button className="upload-btn">Upload More</button>
        </Link>
      </div>
    </div>
  );
}
