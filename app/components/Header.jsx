"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import { sectionsLinks } from './mainvars'
import Container from './Container'
import HeaderBurger from './headerBurger'
import LinksContainer from './LinksContainer'

const Header = () => {
  // const session = useSession();
    const [isSmallHeaderActive, setIsSmallHeaderActive] = useState(false);
    // useEffect(()=>{
    //     console.log("isSmallHeaderActive", isSmallHeaderActive);
    //   },[isSmallHeaderActive] )
      const handleBurgerChange = (e) => {
        setIsSmallHeaderActive(e.target.checked);
      };
  return (
    <header className='w-full bg-[#f8f8f8b1] backdrop-blur fixed z-[999]'>
    <Container >
    <nav className="px-4 lg:px-6 py-2.5 flex justify-between items-center">
        <h5 className={`text-2xl md:visible ${isSmallHeaderActive?`invisible`:`block`}`}>CVsiteAdminPanel</h5>
        <LinksContainer isSmallHeaderActive={isSmallHeaderActive} setIsSmallHeaderActive={setIsSmallHeaderActive}/>
       <HeaderBurger classes={''}handleBurgerChange={handleBurgerChange} isSmallHeaderActive={isSmallHeaderActive}/>
    </nav> 
    </Container>
    </header>
  )
}

export default Header