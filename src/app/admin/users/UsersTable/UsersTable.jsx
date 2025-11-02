'use client';
import React, { useEffect, useState } from 'react';
import './UsersTable.css';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';
import AddUserModal from '../AddUserModal/AddUserModal';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const UsersTable = ({onUpdate, refreshKey}) => {
  const [filter, setFilter] = useState('All Users');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
const [deletingUserId, setDeletingUserId] = useState(null);

useEffect(() => {
    const handleClickOutside = (e) => {
      // Close dropdown only if click is outside *all* dropdowns
      if (!e.target.closest('.actions-wrapper')) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/users/detailed`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshKey]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'All Users' ||
      (filter === 'Active' && user.status === 'active') ||
      (filter === 'Inactive' && user.status === 'inactive') ||
      (filter === 'Admins' && user.role === 'admin');
    return matchesSearch && matchesFilter;
  });

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setDropdownOpen(null);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
  };


  const handleDeleteClick = async (id) => {
  setDeletingUserId(id);
  try {
    const res = await fetch(`${baseUrl}/users/delete-user/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      onUpdate();
      toast.success('User deleted successfully');
       setDropdownOpen(null);
    } else {
      console.error('Failed to delete user:', data.message);
      toast.error(data.message);
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    toast.error("Error while deleting a user");
  } finally {
    setDeletingUserId(null);
  }
};



  return (
    <div className="table-container">
      {/* Search */}
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {['All Users', 'Active', 'Inactive', 'Admins'].map((tab) => (
          <button
            key={tab}
            className={`filter-btn ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Credits</th>
            <th>Last Login</th>
            <th>Email Verified</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
      <tr key={idx} className="skeleton-row">
        {Array.from({ length: 7 }).map((_, colIdx) => (
          <td key={colIdx}>
            <div className="skeleton-cell"></div>
          </td>
        ))}
      </tr>
    ))
            : filteredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </td>
                 <td>
  {Array.isArray(user.role) && user.role.length > 0 ? (
    user.role.map((role, index) => (
      <span key={index} className={`role-badge ${role}`}>
        {role}
      </span>
    ))
  ) : (
    <span className="role-badge user">user</span>
  )}
</td>

                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.credits}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <span
                      className={`verify-badge ${
                        user.emailVerified === 'Verified'
                          ? 'verified'
                          : 'unverified'
                      }`}
                    >
                      {user.emailVerified}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="actions-wrapper" >
  <FiMoreVertical
    className="actions-icon"
    onClick={() => handleDropdownToggle(idx)}
  />
  {dropdownOpen === idx && (
    <div className="actions-dropdown">
      <button onClick={() => handleUpdateClick(user)}>Update</button>
      <button onClick={() => handleDeleteClick(user.id)} disabled={deletingUserId === user.id}>
  {deletingUserId === user.id ? (
    <Loader2 className="animate-spin" size={16} />
  ) : (
    'Delete'
  )}
</button>

    </div>
  )}
</div>

                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedUser && (
        <AddUserModal user={selectedUser} onClose={handleModalClose} onUpdate={onUpdate} />
      )}
    </div>
  );
};

export default UsersTable;
