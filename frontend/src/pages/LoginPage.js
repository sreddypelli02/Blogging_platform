// LoginPage.js
import React, { useEffect } from 'react';
import './hslpages.css'; // Import the CSS file

const LoginPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate form data
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // If login successful, extract username from response and store in local storage
      const data = await response.json();
      localStorage.setItem('username', data.username);
      localStorage.setItem('useremail', data.email);

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  // Clear localStorage when LoginPage component mounts
  useEffect(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('useremail');
  }, []);

  return (
    <div className="login-page">
      <div className="transparent-blockhsl">
        <center><h2 className='hslh2'>Login</h2></center>
        <center>
          <form onSubmit={handleSubmit}>
            <div className="form-grouphsl">
              <input type="email" id="email" name="email" placeholder="Email" />
            </div>
            <div className="form-grouphsl">
              <input type="password" id="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="button3">Login</button>
          </form>
        </center>
      </div>
    </div>
  );
};

export default LoginPage;
