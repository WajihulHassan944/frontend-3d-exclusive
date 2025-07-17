'use client';

import React from 'react';
import './profile.css';
import { useSelector } from 'react-redux';

const UserProfileCard = () => {
  const user = useSelector((state) => state.user);

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const profileUrl = user.profileUrl || 'https://via.placeholder.com/100';
  const country = user.country || 'N/A';
  const email = user.email || 'N/A';
  const credits = user?.wallet?.balance || 0;

  return (
    <div className="profile-card">
      <div className="profile-image-box">
        <img src={profileUrl} alt={fullName} className="profile-img" />
      </div>
      <h2 className="profile-name">{fullName}</h2>
      <p className="profile-info"><strong>Email:</strong> {email}</p>
      <p className="profile-info"><strong>Country:</strong> {country}</p>
      <p className="profile-info"><strong>Credits:</strong> {credits}</p>
    </div>
  );
};

export default UserProfileCard;
