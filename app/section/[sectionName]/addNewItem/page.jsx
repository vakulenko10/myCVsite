"use client"
import Container from '@/app/components/Container'
import DynamicForm from '@/app/components/DynamicForm'
import GetImagesFromFolder from '@/app/components/GetImagesFromCloudinary'
import { ImageProvider } from '@/app/components/ImageURLContext'
import React from 'react'
const Page = ({params}) => {
  console.log("params:", params)
  return (
    <div className='page'>
      <ImageProvider>
      <Container>
      <h1>add item to section: {params.sectionName}</h1>
      <Container className='flex flex-col justify-center items-center md:flex md:flex-row md:flex-wrap md:justify-around'>
      <DynamicForm sectionName={params.sectionName}/>
      <GetImagesFromFolder sectionName={params.sectionName}/>
      </Container>
      </Container>
      </ImageProvider>
      </div>
  )
}

export default Page