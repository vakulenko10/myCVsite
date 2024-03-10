"use client"
import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imageURLFromContext, setImageURLFromContext] = useState('');

  return (
    <ImageContext.Provider value={{ imageURLFromContext, setImageURLFromContext}}>
      {children}
    </ImageContext.Provider>
  );
};