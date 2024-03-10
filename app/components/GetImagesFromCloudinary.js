"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { fetchPhotos } from '@/libs/GetCloudinary';
import { useImage } from './ImageURLContext';
import Carousel from './Carousel';
const GetImagesFromFolder = ({sectionName}) => {
        const [photos, setPhotos] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const { setImageURLFromContext } = useImage();
        useEffect(() => {
        const fetchData = async (sectionName) => {
            try {   
            const photosData = await fetchPhotos(sectionName);
            setPhotos(photosData);
            console.log(photosData)
            setIsLoading(false);
            } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
            }
        };
        fetchData(sectionName);
        }, []);
        if(isLoading){
            return (
                <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                >
                </div>
            )
        }
        return (
            <div className={`imagesFolderSection ${sectionName}`}>
                {/* <h1>images folder name on cloudinary:"{sectionName}" </h1> */}
                <Carousel photos={photos}/>
            </div>
        )
}

export default GetImagesFromFolder