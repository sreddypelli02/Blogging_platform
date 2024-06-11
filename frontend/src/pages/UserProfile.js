// UserProfile.js
import React, { useState, useEffect } from 'react';
import WeightHeightEditor from './WeightHeightEditor';
import './up.css';
const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: '',
    useremail: '',
    weight: '',
    height: ''
  });
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userEmail = localStorage.getItem('useremail');
      const username = localStorage.getItem('username'); // Assuming username is stored in local storage
      const response = await fetch(`http://localhost:5002/userprofile?email=${userEmail}&username=${username}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (weight, height) => {
    // Implement logic to update weight and height
    console.log('Updating weight and height:', weight, height);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.useremail}</p>
      <p><strong>Weight:</strong> {userData.weight} kg</p>
      <p><strong>Height:</strong> {userData.height} cm</p>
      <button className='bstyle' onClick={() => setShowEditor(true)}>Edit Weight and Height</button>
      {showEditor && <WeightHeightEditor onClose={() => setShowEditor(false)} onUpdate={handleUpdate} />}
    </div>
  );
};

export default UserProfile;
