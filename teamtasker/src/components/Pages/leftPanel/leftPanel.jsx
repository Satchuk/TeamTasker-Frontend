import React, { useState } from 'react';
import './leftPanel.css';
import {
  FaBars,
  FaHome,
  FaTasks,
  FaUser
} from 'react-icons/fa';

const LeftPanel = ({ setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`left-panel ${isOpen ? 'open' : 'closed'}`}>
      
      {/* Menu toggle */}
      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>

      {/* Menu items */}
      <ul className="menu-list">
        <li  onClick={() => setActivePage("dashboard")}>
          <FaHome className="icon" />
          {isOpen && <span>Dashboard</span>}
        </li>

        <li onClick={() => setActivePage("tasks")}>
          <FaTasks className="icon" />
          {isOpen && <span>Task Board</span>}
        </li>

        <li  onClick={() => setActivePage("profile")}>
          <FaUser className="icon" />
          {isOpen && <span>Profile</span>}
        </li>
      </ul>

    </aside>
  );
};

export default LeftPanel;
