import React from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <></>
  );
};

export default Header;