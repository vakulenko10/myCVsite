'use client';

import Container from '@/app/components/Container';
import DynamicForm from '@/app/components/DynamicForm';
import AskMeQuestionForm from '@/app/components/AskMeQuestionForm';
import GetImagesFromFolder from '@/app/components/GetImagesFromCloudinary';
import { ImageProvider } from '@/app/components/ImageURLContext';
import React, { useEffect, useState } from 'react';
import type { SectionName, SectionItemType, AskMeQuestionType } from '@/types';

interface PageProps {
  params: {
    sectionName: SectionName;
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [contentItem, setContentItem] = useState<SectionItemType | null>(null);
  const isAskMeQuestions = params.sectionName === 'askmequestions';

  useEffect(() => {
    const getContentById = async (): Promise<void> => {
      try {
        const res = await fetch(`/api/fetchContentFromDB/${params.sectionName}/${params.id}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setContentItem(data.contentItem);
      } catch (error) {
        console.error('Error loading content: ', error);
      }
    };

    getContentById();
  }, [params.sectionName, params.id]);

  return (
    <div className="page">
      <ImageProvider>
        <Container className="flex flex-col justify-center items-center md:flex md:flex-row md:flex-wrap md:justify-around">
          {isAskMeQuestions ? (
            <AskMeQuestionForm
              sectionName={params.sectionName}
              initialData={(contentItem as AskMeQuestionType) || undefined}
            />
          ) : (
            <>
              <DynamicForm sectionName={params.sectionName} initialData={contentItem || undefined} />
              <GetImagesFromFolder sectionName={params.sectionName} />
            </>
          )}
        </Container>
      </ImageProvider>
    </div>
  );
};

export default Page;




