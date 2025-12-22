'use client';

import React, { useState } from 'react';
import { useImage } from './ImageURLContext';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface CloudinaryPhoto {
  url: string;
  original_filename?: string;
  [key: string]: unknown;
}

interface CarouselProps {
  photos: CloudinaryPhoto[];
}

const Carousel: React.FC<CarouselProps> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { setImageURLFromContext } = useImage();

  const handlePrevious = (): void => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNext = (): void => {
    setActiveIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  console.log('photos:', photos);

  return (
    <>
      <div className="relative carousel overflow-hidden box-border flex max-w-full md:w-[400px] md:h-[500px]">
        {photos.length !== 0 ? (
          <div className="w-full flex flex-col justify-center items-center">
            <img
              src={photos[activeIndex]?.url}
              alt={photos[activeIndex]?.original_filename || 'Carousel image'}
              onClick={() => setImageURLFromContext(photos[activeIndex]?.url || '')}
              className="object-contain w-full h-5/6"
            />
            <h5 className="absolute text-white">click on the img to assign it to the item</h5>
            <div className="button-container absolute bottom-10 flex justify-between w-full">
              <button id="previousImage" onClick={handlePrevious}>
                <FaArrowCircleLeft size={60} fill="#fff" />
              </button>
              <button id="nextImage" onClick={handleNext}>
                <FaArrowCircleRight size={60} fill="#fff" />
              </button>
            </div>
          </div>
        ) : (
          <>no photos in that section</>
        )}
      </div>
    </>
  );
};

export default Carousel;


