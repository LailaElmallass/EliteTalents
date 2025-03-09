import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/UserSlice';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import AdviceCard from '../components/AdviceCard';
import TrainingCard from '../components/TrainingCard';
import UserTable from "../components/UserTable";
import '../style/Dashboard.css';


const User_dashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-grid">
          <StatsCard />
          <AdviceCard />
          <TrainingCard />
        </div>
        <UserTable users={users} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default User_dashboard;