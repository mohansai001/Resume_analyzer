import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './Charts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [statusData, setStatusData] = useState({ total: 0, rejected: 0, shortlisted: 0 });

  useEffect(() => {
    // Fetch weekly data
    fetch('https://resumeanalyzer-ggezh7b8b0b5cwat.canadacentral-01.azurewebsites.net/api/candidates/weekly-counts')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setWeeklyData(data.data);
        }
      })
      .catch(error => console.error('Error fetching weekly data:', error));

    // Fetch status data
    fetch('https://resumeanalyzer-ggezh7b8b0b5cwat.canadacentral-01.azurewebsites.net/api/candidates/resume-counts')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setStatusData({
            total: parseInt(data.data.total_resumes),
            rejected: parseInt(data.data.rejected_count),
            shortlisted: parseInt(data.data.shortlisted_count)
          });
        }
      })
      .catch(error => console.error('Error fetching status data:', error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };

  const barData = {
    labels: weeklyData.map(item => formatDate(item.start_date)),
    datasets: [
      {
        label: 'Uploaded',
        data: weeklyData.map(item => parseInt(item.uploaded)),
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: '#2563eb',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Rejected',
        data: weeklyData.map(item => parseInt(item.rejected)),
        backgroundColor: 'rgba(251, 146, 60, 0.8)',
        borderColor: '#fb923c',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Shortlisted',
        data: weeklyData.map(item => parseInt(item.shortlisted)),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const pieData = {
    labels: ['Total Resumes', 'Rejected', 'Shortlisted'],
    datasets: [
      {
        data: [statusData.total, statusData.rejected, statusData.shortlisted],
        backgroundColor: [
          'rgba(37, 99, 235, 0.9)',
          'rgba(251, 146, 60, 0.9)', 
          'rgba(16, 185, 129, 0.9)'
        ],
        borderColor: ['#2563eb', '#fb923c', '#10b981'],
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#10b981',
        },
      },
      title: {
        display: true,
        text: 'Weekly Resume Status',
        color: '#10b981',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#10b981',
        },
      },
      title: {
        display: true,
        text: 'Candidates Resume Status ',
        color: '#10b981',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
  };

  const downloadReport = () => {
    // Add download functionality here
    console.log('Downloading report...');
  };

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h1>Analytics Dashboard</h1>
        <button className="download-report-btn" onClick={downloadReport}>
          📊 Download Full Report
        </button>
      </div>
      
      <div className="charts-grid">
        <div className="chart-card">
          <Bar data={barData} options={barOptions} />
        </div>
        
        <div className="chart-card">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;