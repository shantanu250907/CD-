import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, color, trend }) => {
  return (
    <div className="stat-card" style={{ background: color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <div className="stat-value">{value}</div>
        {trend && <p className="stat-trend">{trend}</p>}
      </div>
    </div>
  );
};

export default StatCard;