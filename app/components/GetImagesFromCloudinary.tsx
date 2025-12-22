'use client';

import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '@/libs/GetCloudinary';
import { useImage } from './ImageURLContext';
import Carousel from './Carousel';

interface CloudinaryPhoto {
  url: string;
  original_filename?: string;
  [key: string]: unknown;
}

interface GetImagesFromFolderProps {
  sectionName: string;
}

const GetImagesFromFolder: React.FC<GetImagesFromFolderProps> = ({ sectionName }) => {
  const [photos, setPhotos] = useState<CloudinaryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setImageURLFromContext } = useImage();

  useEffect(() => {
    const fetchData = async (sectionName: string): Promise<void> => {
      try {
        const photosData = await fetchPhotos(sectionName);
        // Map Cloudinary resources to expected format
        const mappedPhotos: CloudinaryPhoto[] = photosData.map((photo) => ({
          url: photo.secure_url,
          original_filename: photo.public_id.split('/').pop(),
          ...photo,
        }));
        setPhotos(mappedPhotos);
        console.log(mappedPhotos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData(sectionName);
  }, [sectionName]);

  if (isLoading) {
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className={`imagesFolderSection ${sectionName}`}>
      <Carousel photos={photos} />
    </div>
  );
};

export default GetImagesFromFolder;


