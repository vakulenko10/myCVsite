'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { ImageContextType } from '@/types';

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider = ({ children }: ImageProviderProps): JSX.Element => {
  const [imageURLFromContext, setImageURLFromContext] = useState<string>('');

  return (
    <ImageContext.Provider value={{ imageURLFromContext, setImageURLFromContext }}>
      {children}
    </ImageContext.Provider>
  );
};




