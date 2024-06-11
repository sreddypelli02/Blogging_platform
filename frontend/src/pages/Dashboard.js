// Dashboard.js
import React, { useState, useEffect } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';
import './Dashboard.css';
import UserProfile from './UserProfile';
import NewGoal from './NewGoal';
import DailyActivity from './DailyActivity';
import Support from './Support';
import DefaultPage from './DefaultPage';
import Progress from './Progress';

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeContent, setActiveContent] = useState('DefaultPage');
  const [activeButton, setActiveButton] = useState(null); // State to store the active button
  const username = localStorage.getItem('username');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('useremail');
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setActiveContent('DefaultPage');
  };

  const handleButtonClick = (content) => {
    setActiveContent(content);
    setActiveButton(content); // Set the active button when clicked
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="left">
          <FaBars className="menu-icon" onClick={toggleSidebar} />
          <h1>Dashboard</h1>
        </div>
        <div className="right">
          <span onClick={() => setShowDropdown(!showDropdown)}>{username}</span>
          <FaUser className="user-icon" onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      {showSidebar && (
        <div className="sidebar">
          <button
            className={`sidebar-button ${activeButton === 'UserProfile' ? 'active' : ''}`} // Apply active class if the button is active
            onClick={() => handleButtonClick('UserProfile')}
          >
            User Profile
          </button>
          <button
            className={`sidebar-button ${activeButton === 'NewGoal' ? 'active' : ''}`} // Apply active class if the button is active
            onClick={() => handleButtonClick('NewGoal')}
          >
            Set a new goal
          </button>
          <button
            className={`sidebar-button ${activeButton === 'DailyActivity' ? 'active' : ''}`} // Apply active class if the button is active
            onClick={() => handleButtonClick('DailyActivity')}
          >
            Update Daily Activity
          </button>
          <button
            className={`sidebar-button ${activeButton === 'Progress' ? 'active' : ''}`} // Apply active class if the button is active
            onClick={() => handleButtonClick('Progress')}
          >
            Progress
          </button>
          <button
            className={`sidebar-button ${activeButton === 'Support' ? 'active' : ''}`} // Apply active class if the button is active
            onClick={() => handleButtonClick('Support')}
          >
            Support
          </button>
        </div>
      )}
      <br />
      <br />
      <br />
      <div className="content">
        {activeContent === 'UserProfile' && <UserProfile />}
        {activeContent === 'NewGoal' && <NewGoal />}
        {activeContent === 'DailyActivity' && <DailyActivity />}
        {activeContent === 'Progress' && <Progress />}
        {activeContent === 'Support' && <Support />}
        {activeContent === 'DefaultPage' && <DefaultPage />}
      </div>
    </div>
  );
};

export default Dashboard;
