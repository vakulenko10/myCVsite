'use client';

import React from 'react';

interface HeaderBurgerProps {
  classes?: string;
  handleBurgerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSmallHeaderActive: boolean;
}

const HeaderBurger: React.FC<HeaderBurgerProps> = ({
  classes,
  handleBurgerChange,
  isSmallHeaderActive,
}) => {
  return (
    <>
      <label className={`burger md:hidden ${classes || ''}`} htmlFor="burger">
        <input
          type="checkbox"
          id="burger"
          checked={isSmallHeaderActive}
          onChange={handleBurgerChange}
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </>
  );
};

export default HeaderBurger;


