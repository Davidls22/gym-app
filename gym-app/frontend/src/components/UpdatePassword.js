import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('http://localhost:8082/api/update-password', { email, currentPassword, newPassword });
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error); // Display the error message returned by the API
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button type="submit">Save New Password</button>
    </form>
    </div>
  );
};

export default UpdatePassword;
