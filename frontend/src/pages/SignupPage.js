// SignupPage.js
import React, { useState } from 'react';
import './hslpages.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      alert('Signed up successfully');
      // Redirect to login page
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="signup-page">
      <div className="transparent-blockhsl">
        <center><h2 className="hslh2">Sign Up</h2></center>
        <center>
          <form onSubmit={handleSubmit}>
            <div className="form-grouphsl">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            </div>
            <div className="form-grouphsl">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div className="form-grouphsl">
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </div>
            <button type="submit" className="button2">Sign Up</button>
          </form>
        </center>
      </div>
    </div>
  );
};

export default SignupPage;
