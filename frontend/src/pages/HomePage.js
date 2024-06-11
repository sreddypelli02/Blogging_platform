import React from 'react';
import { Link } from 'react-router-dom';
import './hslpages.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="transparent-blockhsl">
        <h1 className='homeh1'>L I V E L Y</h1>
        <h2 className='homeh2'>Health & Exercise Hub</h2>
        <div className="buttons1">
          <Link to="/login" className="button1">Login</Link>
          <Link to="/signup" className="button1">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
