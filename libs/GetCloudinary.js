// Initialize Cloudinary
"use server"
import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  
  // Function to fetch photos from Cloudinary
  export const fetchPhotos = async (sectionName) => {
    try {
      const response = await cloudinary.v2.api.resources(
          { 
            type: 'upload',
            prefix: `${sectionName}`
      
          });
      console.log("response:", response)
      return response.resources;
    } catch (error) {
      console.error('Error fetching photos from Cloudinary:', error);
      throw error;
    }
  };