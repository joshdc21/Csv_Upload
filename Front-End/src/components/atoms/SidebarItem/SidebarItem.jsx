import React from 'react';
import './SidebarItem.css';

const SidebarItem = ({ label, onClick }) => {
  return (
    <div className="sidebar-item" onClick={onClick}>
      {label}
    </div>
  );
};

export default SidebarItem;