'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './profilesettings.css';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '@/const';
import { loginUser } from '@/redux/features/userSlice';
import NewsletterToggle from './NewsletterToggle/NewsletterToggle';

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    password: '',
    newPassword: '',
    repeatPassword: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setFormData({
        userId: user._id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        country: user.country || '',
        password: '',
        newPassword: '',
        repeatPassword: '',
      });
      setPreviewUrl(user.profileUrl || '');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);

    const updatesMade = {
      profile: false,
      password: false,
    };

    // --- Profile Update ---
    const profileForm = new FormData();
    profileForm.append('userId', formData.userId);
    profileForm.append('firstName', formData.firstName);
    profileForm.append('lastName', formData.lastName);
    profileForm.append('email', formData.email);
    profileForm.append('country', formData.country);
    if (profileImage) {
      profileForm.append('profileImg', profileImage);
    }

    try {
      const res = await fetch(`${baseUrl}/users/update-profile`, {
        method: 'PUT',
        body: profileForm,
      });

      const data = await res.json();
      if (data.success) {
        dispatch(loginUser(data.user));
        updatesMade.profile = true;
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      alert('Something went wrong while updating profile.');
    }

    // --- Password Update ---
    if (formData.password && formData.newPassword && formData.repeatPassword) {
      if (formData.newPassword !== formData.repeatPassword) {
        setLoading(false);
        alert('Passwords do not match');
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/users/reset-password-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            currentPassword: formData.password,
            newPassword: formData.newPassword,
          }),
        });

        const data = await res.json();
        if (data.success) {
          updatesMade.password = true;
        } else {
          alert(data.message || 'Failed to reset password');
        }
      } catch (err) {
        console.error('Password reset error:', err);
        alert('Something went wrong while resetting password.');
      }
    }

    // --- Final Alert ---
    if (updatesMade.profile && updatesMade.password) {
      alert('Profile and password updated successfully!');
    } else if (updatesMade.profile) {
      alert('Profile updated successfully!');
    } else if (updatesMade.password) {
      alert('Password updated successfully!');
    }

    setLoading(false);
  };

  return (
    <div className="profile-wrapper">
      <h2>Profile Settings</h2>

      <div className="section-card">
        <h3>My Account</h3>
        <div className="account-section">
          <div className="profile-image-container">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="profile-preview" />
            ) : (
              <FaUserCircle className="profile-icon" />
            )}
            <span
              className="edit-icon"
              onClick={() => fileInputRef.current?.click()}
            >
              ✎
            </span>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>

          <div className="input-grid">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h3>Password & Security</h3>
        <div className="password-grid">
          <input
            type="password"
            name="password"
            placeholder="Current Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat New Password"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
        </div>
        <NewsletterToggle />
        <button className="save-button" onClick={handleSaveChanges} disabled={loading}>
          {loading ? <span className="spinner" /> : 'Save changes'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
