'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Container from '@/app/components/Container';
import SectionItem from '@/app/components/SectionItem';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Loader from '@/app/components/Loader';
import type { SectionName, SectionItemType } from '@/types';

interface PageProps {
  params: {
    sectionName: SectionName;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [contentItems, setContentItems] = useState<SectionItemType[]>([]);
  const [schema, setSchema] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const sections: SectionName[] = ['welcome', 'aboutMe', 'myPortfolio', 'skills', 'someNews'];
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/section/${params.sectionName}`);
    },
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (!sections.includes(params.sectionName)) {
          console.log('there is no such directory on our website  ');
          return;
        }
        const res = await fetch(`/api/fetchContentFromDB/${params.sectionName}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Data:', data);
        console.log('Content:', data.contentItems);
        setContentItems(data.contentItems);
        setSchema(data.modelProperties);
      } catch (error) {
        console.error('Error loading content: ', error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchData();
  }, [params.sectionName]);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const userConfirmed = window.confirm('Are you sure you want to delete this item?');

      if (!userConfirmed) {
        return; // If the user cancels the action, do nothing
      }
      const res = await fetch(`/api/fetchContentFromDB/${params.sectionName}?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete item: ${res.status} ${res.statusText}`);
      }

      // Update the contentItems state after successful deletion
      setContentItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  if (!sections.includes(params.sectionName)) {
    return (
      <div className="page">
        <h1>404 </h1>
        <h3>there is no such directory...</h3>
      </div>
    );
  }

  return (
    <main className="page pb-[20px] pt-[100px]">
      <Container className={`px-3 flex flex-col justify-center items-center md:px-0 `}>
        <h1>{params.sectionName} Page</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            <button
              id="addNewItemBtn"
              className="p-3 mb-3 rounded text-white bg-[#39c420] hover:bg-[#39c420af] hover:text-[#39c420af]rounded"
            >
              <Link href={`/section/${params.sectionName}/addNewItem`}>
                add item to that section
              </Link>
            </button>
            <div className="sectionItems flex flex-col justify-center items-center gap-[10px] w-full overflow-hidden md:grid md:grid-cols-2 md:gap-4 md:justify-center md:items-center md:w-full lg:grid lg:grid-cols-3 lg:gap-4 lg:justify-center  lg:w-full">
              {contentItems?.map((item, index) => (
                <SectionItem
                  key={index}
                  item={item}
                  sectionName={params.sectionName}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </main>
  );
};

export default Page;


