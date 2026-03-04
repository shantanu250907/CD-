import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ menuItems, sidebarOpen, setSidebarOpen, onLogout }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏥</span>
          {sidebarOpen && <span className="logo-text">Omkar Clinic</span>}
        </div>
        {/* <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '◀' : '▶'}
        </button> */}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {sidebarOpen && <span className="nav-text">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="admin-info">
          <div className="admin-avatar">👤</div>
          {sidebarOpen && (
            <div className="admin-details">
              <p className="admin-name">Admin User</p>
              <p className="admin-role">Administrator</p>
            </div>
          )}
        </div>
        <button className="logout-btn" onClick={onLogout} title="Logout">
          <span className="logout-icon">🚪</span>
          {sidebarOpen && <span className="logout-text">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;