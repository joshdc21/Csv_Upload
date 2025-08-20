import React, { useState } from 'react';
import SidebarItem from '../../atoms/SidebarItem/SidebarItem';
import './sidebar.css'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onReset, showDashboard, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (onReset) onReset();
    navigate('/');
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setIsOpen(false);
  };

  const handleResultClick = () => {
    navigate('/result');
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className="hamburger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>

        <SidebarItem label="Upload" onClick={handleUploadClick} />
        {showDashboard && (
          <>
            <SidebarItem label="Dashboard" onClick={handleDashboardClick} />
            <SidebarItem label="Result" onClick={handleResultClick} />
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
