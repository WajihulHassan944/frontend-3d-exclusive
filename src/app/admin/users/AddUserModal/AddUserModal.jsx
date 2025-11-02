'use client';
import React, { useState } from 'react';
import './AddUserModal.css';
import { FiX } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
const AddUserModal = ({ user, onClose, onAdd, onUpdate }) => {
  console.log(user);
const [formData, setFormData] = useState({
  name: user ? user.name : '',
  email: user ? user.email : '',
  password: '',
  role: user ? user.role : 'user',
});

  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    const endpoint = user
      ? `${baseUrl}/users/update-profile`
      : `${baseUrl}/users/register`;

    const method = user ? 'PUT' : 'POST';

    const body = user
      ? { userId: user.id, firstName, lastName, email: formData.email,  role: formData.role, }
      : {
          firstName,
          lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          addedByAdmin: true,
        };

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to process request');
    }

    toast.success(user ? 'User updated successfully!' : 'User created successfully!');
    if(user){
      onUpdate();
    }else{
      onAdd();
    }
    onClose();
  } catch (err) {
    console.error(err);
    toast.error(err.message || 'Something went wrong.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="modal-overlay-user">
      <div className="modal-content">
        <div className="modal-header">
        <h2>{user ? 'Update User' : 'Add New User'}</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

       <p className="modal-subtitle">
  {user ? 'Modify existing user details' : 'Create a new user account'}
</p>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="User name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
           <button type="submit" className="btn-primary" disabled={loading}>
  {loading ? (
    <Loader2 className="animate-spin" size={20} />
  ) : user ? (
    'Update User'
  ) : (
    'Create User'
  )}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
