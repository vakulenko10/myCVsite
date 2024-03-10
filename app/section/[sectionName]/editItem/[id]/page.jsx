"use client"
import Container from '@/app/components/Container';
import DynamicForm from '@/app/components/DynamicForm';
import GetImagesFromFolder from '@/app/components/GetImagesFromCloudinary';
import { ImageProvider } from '@/app/components/ImageURLContext';
import React, { useEffect, useState } from 'react'
const Page = ({params}) => {
  const [contentItem, setContentItem] = useState([]);
  console.log("params:", params)
  useEffect(() => {
    const getContentById = async () => {
      try {
        // if (!sections.includes(params.sectionName)) {
        //     console.log("there is no such directory on our website  ")
        //     return;
        //   }
        const res = await fetch(`/api/fetchContentFromDB/${params.sectionName}/${params.id}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Data:", data)
        console.log('Content:', data.contentItem);
        setContentItem(data.contentItem);
      } catch (error) {
        console.error('Error loading content: ', error);
      }
    };

    getContentById();
  }, [params.sectionName]); 
  return (
    
    <div className='page'>
      <ImageProvider>
      <Container className='flex flex-col justify-center items-center md:flex md:flex-row md:flex-wrap md:justify-around'>

        <DynamicForm sectionName={params.sectionName} initialData={contentItem}/>
        <GetImagesFromFolder sectionName={params.sectionName}/>
      </Container>
      </ImageProvider>
    </div>
  )
}

export default Page