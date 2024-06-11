import React, { useState, useEffect } from 'react';
import './up.css';

const NewGoal = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalType, setGoalType] = useState('');
  const [weightGoal, setWeightGoal] = useState('');
  const [goalTypec, setGoalTypec] = useState('');
  const [weightGoalc, setWeightGoalc] = useState('');

  useEffect(() => {
    // Fetch user details from database
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userEmail = localStorage.getItem('useremail');
      const response = await fetch(`http://localhost:5002/userdetails?email=${userEmail}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await response.json();
      // Set state with fetched user details
      setGoalTypec(userData.goaltype);
      setWeightGoalc(userData.weightgoal);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const userEmail = localStorage.getItem('useremail');
      const response = await fetch('http://localhost:5002/userdetails/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail: userEmail,
          weight: weight,
          height: height,
          goaltype: goalType,
          weightgoal: weightGoal
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      console.log('User details updated successfully');

      setWeight('');
      setHeight('');
      setGoalType('');
      setWeightGoal('');
      // Redirect to dashboard
      window.location.href = '/dashboard';
      // Show popup for successful update
      window.alert('Details updated successfully!');

      
    } catch (error) {
      console.error('Error updating user details:', error.message);
    }
  };

  return (
    <div>
      <h2>Current Goal</h2>
      {goalTypec && <p><strong className="blabel">Goal Type:</strong> {goalTypec}</p>}
      {weightGoalc && <p><strong className="blabel">Weight Goal (kg):</strong> {weightGoalc}</p>}

      <h2>New Goal</h2>
      <form>
        <div>
          <label className='blabel' htmlFor="weight">Current Weight (kg):</label>
          <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <br/>
        <div>
          <label className='blabel' htmlFor="height">Current Height (cm):</label>
          <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <br/>
        <div>
          <label className='blabel' htmlFor="goalType">Goal Type:</label>
          <select id="goalType" value={goalType} onChange={(e) => setGoalType(e.target.value)}>
            <option value="">Select</option>
            <option value="weightloss">Weight Loss</option>
            <option value="weightgain">Weight Gain</option>
          </select>
        </div>
        <br/>
        <div>
          <label className='blabel' htmlFor="weightGoal">Weight Goal (kg):</label>
          <input type="number" id="weightGoal" value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)} />
        </div>
        <br/>
        <button className='bstyle' type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default NewGoal;
