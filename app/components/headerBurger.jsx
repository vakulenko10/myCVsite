"use client"
import React, { useEffect, useState } from 'react'

const HeaderBurger = ({classes,handleBurgerChange, isSmallHeaderActive}) => {
  
  return (
    <>
    <label className={`burger md:hidden`} htmlFor="burger">
      <input type="checkbox" id="burger"  checked={isSmallHeaderActive} onChange={handleBurgerChange}/>
      <span></span>
      <span></span>
      <span></span>
    </label>
    </>
  )
}

export default HeaderBurger