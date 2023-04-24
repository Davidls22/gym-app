import React from 'react';
import GymLogo from '../images/GymLogo.jpg';

const Header = () => {
  return (
    <div className="header">
      <img src={GymLogo} alt="Heavyweight Gym" className="header-image" />
    </div>
  );
};

export default Header;
