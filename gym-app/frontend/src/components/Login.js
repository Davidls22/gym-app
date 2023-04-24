import React, { useState } from 'react';
import axios from 'axios';
import UpdatePassword from './UpdatePassword';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('http://localhost:8082/api/register', { name, email, password });
  
      window.alert('User registered successfully!');
      console.log(data);
    } catch (error) {
      window.alert(error.response.data.error);
      console.error(error);
    }
  };
  

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="register-form">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('http://localhost:8082/api/login', { email, password });
      alert('Log in successful');
      onLogin(false); // Call the onLogin prop with false to set the userType state to 'user'
      console.log(data); // Log the API response to the console
  
      // Set the token and userId in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
  
    } catch (error) {
      console.error(error);
      alert(error.response.data.error); // Display the error message returned by the API
    }
  };
  

  const handleToggleUpdatePassword = () => {
    setShowUpdatePassword(!showUpdatePassword);
  }

  return (
    <>
     <div className="form-container">
    <form onSubmit={handleSubmit} className="login-form">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
    </div>
    <button onClick={handleToggleUpdatePassword}>Update Password</button>
    {showUpdatePassword && <UpdatePassword />}
    </>
  );
};


const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8082/api/login/admin', { email, password });

      // Display an alert message if the admin login was successful
      if (data.message) {
        alert(data.message);
        onLogin(true); // Call the onLogin prop with true to set the userType state to 'admin'
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="admin-login-form">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Admin Login</button>
    </form>
    </div>
  );
};


export { Register, Login, AdminLogin };
