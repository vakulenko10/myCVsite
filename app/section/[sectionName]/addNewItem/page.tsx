'use client';

import Container from '@/app/components/Container';
import DynamicForm from '@/app/components/DynamicForm';
import AskMeQuestionForm from '@/app/components/AskMeQuestionForm';
import GetImagesFromFolder from '@/app/components/GetImagesFromCloudinary';
import { ImageProvider } from '@/app/components/ImageURLContext';
import React from 'react';
import type { SectionName } from '@/types';

interface PageProps {
  params: {
    sectionName: SectionName;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const isAskMeQuestions = params.sectionName === 'askmequestions';

  return (
    <div className="page">
      <ImageProvider>
        <Container>
          <h1>add item to section: {params.sectionName}</h1>
          <Container className="flex flex-col justify-center items-center md:flex md:flex-row md:flex-wrap md:justify-around">
            {isAskMeQuestions ? (
              <AskMeQuestionForm sectionName={params.sectionName} />
            ) : (
              <>
                <DynamicForm sectionName={params.sectionName} />
                <GetImagesFromFolder sectionName={params.sectionName} />
              </>
            )}
          </Container>
        </Container>
      </ImageProvider>
    </div>
  );
};

export default Page;




