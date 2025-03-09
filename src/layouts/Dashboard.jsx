import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import AdviceCard from '../components/AdviceCard';
import TrainingCard from '../components/TrainingCard';
import '../style/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="dashboard-grid">
          <StatsCard />
          <AdviceCard />
          <TrainingCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
