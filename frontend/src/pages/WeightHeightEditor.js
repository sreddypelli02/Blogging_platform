import React, { useState } from 'react';
import './up.css';

const WeightHeightEditor = ({ onClose, onUpdate }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleUpdate = async () => {
    // Check if weight and height are not empty
    if (weight && height) {
      try {
        const userEmail = localStorage.getItem('useremail');
        const response = await fetch(`http://localhost:5002/userprofile/update?email=${userEmail}&weight=${weight}&height=${height}`, {
          method: 'PUT',
        });
  
        if (!response.ok) {
          throw new Error('Failed to update weight and height');
        }
  
        // Call onUpdate to update state in UserProfile component
        onUpdate(weight, height);
        onClose();
        // Redirect to dashboard
        window.location.href = '/dashboard';
        // Show popup for successful update
        window.alert('Details updated successfully!');
        
      } catch (error) {
        console.error(error);
        alert('Failed to update weight and height. Please try again.');
      }
    } else {
      alert('Please enter both weight and height values.');
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Weight and Height</h2>
        <label>
          Weight (kg) : &nbsp;
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br/>
        <br/>
        <label>
          Height (cm) : &nbsp;
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <br/>
        <br/>
        <button className='bstyle' onClick={handleUpdate}>Update</button> &nbsp;
        <button className='bstyle' onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default WeightHeightEditor;
