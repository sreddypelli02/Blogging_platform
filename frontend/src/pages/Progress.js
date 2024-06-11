import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Progress = () => {
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = localStorage.getItem('useremail');
        const response = await fetch(`http://localhost:5002/dailyinputs?useremail=${userEmail}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }
        
        const data = await response.json();
        setProgressData(data);
        createChart(data);
      } catch (error) {
        console.error('Error fetching progress data:', error.message);
      }
    };
    
    fetchData();
  }, []);

  const createChart = (data) => {
    const labels = data.map(entry => new Date(entry.date).toLocaleDateString());
    const weights = data.map(entry => entry.todayWeight);

    const ctx = document.getElementById('weightChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Weight',
          data: weights,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Weight'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
  };

  return (
    <div>
      <h2>Progress</h2>
      <div style={{marginRight: "100px", marginLeft: "500px", width:"1200px"}}>
        <canvas  id="weightChart"></canvas>
      </div>
    </div>
  );
};

export default Progress;
