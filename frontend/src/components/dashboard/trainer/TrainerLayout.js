import React from 'react';
import { Outlet } from 'react-router-dom';
import TrainerSidebar from './TrainerSidebar';
import './TrainerLayout.css';

const TrainerLayout = () => {
  return (
    <div className="trainer-layout">
      <TrainerSidebar />
      <main className="trainer-content">
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerLayout;
