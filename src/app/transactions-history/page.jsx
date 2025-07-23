'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import './Transactionshistory.css';

const TransactionsHistory = () => {
  const user = useSelector((state) => state.user);
  const transactions = user?.wallet?.transactions || [];

  const getTotalCredits = (creditsField) => {
    if (Array.isArray(creditsField)) {
      return creditsField.reduce((acc, curr) => acc + (Number(curr.credits) || 0), 0);
    }
    return Number(creditsField) || 0;
  };

  const downloadReceipt = (transaction) => {
    if (!transaction || !user || transaction.type !== 'credit') return;

    const billing = transaction.billingInfo || {};
    const date = new Date(transaction.createdAt).toLocaleString();
    const totalCredits = getTotalCredits(transaction.credits);

    const doc = new jsPDF();

    // Header
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
    doc.text(`Street: ${billing.street || '-'}`, 20, 90);
    doc.text(`City: ${billing.city || '-'}`, 20, 98);
    doc.text(`Postal Code: ${billing.postalCode || '-'}`, 20, 106);
    doc.text(`Country: ${billing.country || '-'}`, 20, 114);
    doc.text(`Company: ${billing.companyName || '-'}`, 20, 122);
    doc.text(`VAT Number: ${billing.vatNumber || '-'}`, 20, 130);

    doc.text('Transaction Details:', 20, 146);
    doc.text(`Date: ${date}`, 20, 154);
    doc.text(`Description: ${transaction.description}`, 20, 162);
    doc.text(`Amount: €${transaction.amount?.toFixed(2)} EUR`, 20, 170);
    doc.text(`Credits: ${totalCredits}`, 20, 178);
doc.text(`Transaction ID: ${transaction._id}`, 20, 186);
doc.text(`Stripe Payment ID: ${transaction.stripePayment.id || '-'}`, 20, 194);

    doc.save(`receipt_${user.firstName}_${transaction._id}.pdf`);
  };

  return (
    <div className='transaction-history-wrap'>
      <h2 className="transactions-title">Past Transactions</h2>

      <div className="transactions-container">
        {transactions.length === 0 ? (
          <p className="no-transactions">You have not made any transactions yet.</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Credits</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
             {[...transactions].reverse().map((tx, index) => (

                <tr key={tx._id || index}>
                  <td>{index + 1}</td>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td>{tx.type}</td>
                  <td>€{tx.amount?.toFixed(2)}</td>
                  <td>{getTotalCredits(tx.credits)}</td>
                  <td>
                    {tx.type === 'credit' ? (
                      <FaDownload
                        className="download-icon"
                        onClick={() => downloadReceipt(tx)}
                        title="Download Receipt"
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionsHistory;
