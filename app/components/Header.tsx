'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Container from './Container';
import HeaderBurger from './headerBurger';
import LinksContainer from './LinksContainer';

const Header: React.FC = () => {
  const [isSmallHeaderActive, setIsSmallHeaderActive] = useState<boolean>(false);

  const handleBurgerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsSmallHeaderActive(e.target.checked);
  };

  return (
    <header className="w-full bg-[#f8f8f8b1] backdrop-blur fixed z-[999]">
      <Container>
        <nav className="px-4 lg:px-6 py-2.5 flex justify-between items-center">
          <h5
            className={`text-2xl md:visible ${isSmallHeaderActive ? `invisible` : `block`}`}
          >
            CVsiteAdminPanel
          </h5>
          <LinksContainer
            isSmallHeaderActive={isSmallHeaderActive}
            setIsSmallHeaderActive={setIsSmallHeaderActive}
          />
          <HeaderBurger
            classes=""
            handleBurgerChange={handleBurgerChange}
            isSmallHeaderActive={isSmallHeaderActive}
          />
        </nav>
      </Container>
    </header>
  );
};

export default Header;


