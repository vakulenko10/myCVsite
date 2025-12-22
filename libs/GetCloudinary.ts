'use server';

import cloudinary from 'cloudinary';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format?: string;
  [key: string]: unknown;
}

interface CloudinaryApiResponse {
  resources: CloudinaryResource[];
  [key: string]: unknown;
}

// Initialize Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Function to fetch photos from Cloudinary
export const fetchPhotos = async (sectionName: string): Promise<CloudinaryResource[]> => {
  try {
    const response = (await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: `${sectionName}`,
    })) as CloudinaryApiResponse;
    
    console.log('response:', response);
    return response.resources;
  } catch (error) {
    console.error('Error fetching photos from Cloudinary:', error);
    throw error;
  }
};


