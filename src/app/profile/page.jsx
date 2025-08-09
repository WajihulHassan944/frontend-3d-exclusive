'use client';

import React, { useState, useRef } from 'react';
import './profile.css';
import { useSelector } from 'react-redux';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import { differenceInDays, addYears, parseISO, isBefore } from 'date-fns';

const UserProfileCard = () => {
  const user = useSelector((state) => state.user);
  const [showCreditInfo, setShowCreditInfo] = useState(false);
  const iconRef = useRef(null);

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const profileUrl = user.profileUrl;
  const country = user.country || 'N/A';
  const email = user.email || 'N/A';
  const credits = user?.wallet?.balance || 0;

  // Get active credits only up to current balance
  const validCredits = [];
  let totalAddedCredits = 0;

  for (const invoice of user.invoices || []) {
    for (const credit of invoice.credits) {
      const addedAt = parseISO(credit.addedAt);
      const expiryDate = addYears(addedAt, 1);
      const now = new Date();

      // Skip expired
      if (isBefore(expiryDate, now)) continue;

      const remainingDays = differenceInDays(expiryDate, now);

      if (totalAddedCredits + credit.credits <= credits) {
        validCredits.push({
          amount: credit.credits,
          expiresIn: remainingDays
        });
        totalAddedCredits += credit.credits;
      } else {
        // Only add partial credits if needed
        const remaining = credits - totalAddedCredits;
        if (remaining > 0) {
          validCredits.push({
            amount: remaining,
            expiresIn: remainingDays
          });
          totalAddedCredits += remaining;
        }
        break;
      }
    }
    if (totalAddedCredits >= credits) break;
  }

  return (
    <div className="profile-card">
      <div className="profile-image-box">
        <img src={profileUrl} alt={fullName} className="profile-img" />
      </div>
      <h2 className="profile-name">{fullName}</h2>
      <p className="profile-info"><strong>Email:</strong> {email}</p>
      <p className="profile-info"><strong>Country:</strong> {country}</p>
      <p className="profile-info relative-credit">
        <strong>Credits:</strong> {credits}
        <FaInfoCircle
          ref={iconRef}
          className="info-icon"
          onClick={() => setShowCreditInfo((prev) => !prev)}
        />
        {showCreditInfo && (
          <div className="credit-info-box">
            <FaTimes className="close-icon" onClick={() => setShowCreditInfo(false)} />
            {validCredits.length === 0 ? (
              <p>No valid credits</p>
            ) : (
              validCredits.map((c, i) => (
                <p key={i}>
                  {c.amount} credit{c.amount > 1 ? 's' : ''} will expire in {c.expiresIn} day{c.expiresIn !== 1 ? 's' : ''}
                </p>
              ))
            )}
          </div>
        )}
      </p>
    </div>
  );
};

export default UserProfileCard;
