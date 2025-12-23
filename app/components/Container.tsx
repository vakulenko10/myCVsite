import React from 'react';
import type { ContainerProps } from '@/types';

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-[1200px] m-auto ${className}`}>{children}</div>
  );
};

export default Container;




