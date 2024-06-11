import React, { useState } from 'react';
import './up.css';

const DailyActivity = () => {
  const [date, setDate] = useState('');
  const [calorieIntake, setCalorieIntake] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [todayWeight, setTodayWeight] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userEmail = localStorage.getItem('useremail');
      const response = await fetch('http://localhost:5002/dailyinputs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail: userEmail,
          date: date,
          calorieIntake: calorieIntake,
          caloriesBurned: caloriesBurned,
          todayWeight: todayWeight
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save daily activity');
      }

      console.log('Daily activity saved successfully');

      // Clear form fields after successful submission
      setDate('');
      setCalorieIntake('');
      setCaloriesBurned('');
      setTodayWeight('');

      // Show popup for successful update
      window.alert('Details updated successfully!');
    } catch (error) {
      console.error('Error saving daily activity:', error.message);
    }
  };

  return (
    <div>
      <h2>Daily Activity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='blabel' htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label className='blabel' htmlFor="todayWeight">Today's Weight (kg):</label>
          <input
            type="number"
            id="todayWeight"
            value={todayWeight}
            onChange={(e) => setTodayWeight(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label className='blabel' htmlFor="calorieIntake">Calorie Intake (kcal) :</label>
          <input
            type="number"
            id="calorieIntake"
            value={calorieIntake}
            onChange={(e) => setCalorieIntake(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label className='blabel' htmlFor="caloriesBurned">Calories Burned (kcal) :</label>
          <input
            type="number"
            id="caloriesBurned"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            required
          />
        </div>
        <br/>
        <button className='bstyle' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DailyActivity;
