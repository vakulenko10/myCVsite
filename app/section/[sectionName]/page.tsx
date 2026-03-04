'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Container from '@/app/components/Container';
import SectionItem from '@/app/components/SectionItem';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Loader from '@/app/components/Loader';
import { HiMiniTrash } from 'react-icons/hi2';
import { AiFillEdit } from 'react-icons/ai';
import type { SectionName, SectionItemType, AskMeQuestionType } from '@/types';

function AskMeQuestionRow({
  item,
  sectionName,
  handleDelete,
  onMoveUp,
  onMoveDown,
}: {
  item: AskMeQuestionType;
  sectionName: SectionName;
  handleDelete: (id: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-white shadow border max-w-full">
      <span className="text-gray-500 font-mono text-sm">#{item.order ?? 0}</span>
      <span className="flex-1 min-w-0 truncate" title={item.enText}>
        {item.enText || item.uaText || item.plText || '—'}
      </span>
      {item.autoSend && (
        <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800">
          Auto-send
        </span>
      )}
      <div className="flex items-center gap-1">
        {onMoveUp && (
          <button
            type="button"
            onClick={onMoveUp}
            className="p-1.5 rounded bg-gray-100 hover:bg-gray-200"
            title="Move up"
          >
            ↑
          </button>
        )}
        {onMoveDown && (
          <button
            type="button"
            onClick={onMoveDown}
            className="p-1.5 rounded bg-gray-100 hover:bg-gray-200"
            title="Move down"
          >
            ↓
          </button>
        )}
        <Link
          href={`/section/${sectionName}/editItem/${item._id}`}
          className="p-1.5 rounded bg-blue-100 hover:bg-blue-200"
          title="Edit"
        >
          <AiFillEdit size={18} />
        </Link>
        <button
          type="button"
          onClick={() => item._id && handleDelete(item._id)}
          className="p-1.5 rounded bg-red-100 hover:bg-red-200"
          title="Delete"
        >
          <HiMiniTrash size={18} />
        </button>
      </div>
    </div>
  );
}

interface PageProps {
  params: {
    sectionName: SectionName;
  };
}

const sections: SectionName[] = [
  'welcome',
  'aboutMe',
  'myPortfolio',
  'skills',
  'someNews',
  'askmequestions',
];

const Page: React.FC<PageProps> = ({ params }) => {
  const [contentItems, setContentItems] = useState<SectionItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [seeding, setSeeding] = useState<boolean>(false);
  useSession({
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
        return;
      }
      const res = await fetch(`/api/fetchContentFromDB/${params.sectionName}?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete item: ${res.status} ${res.statusText}`);
      }

      setContentItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const handleSeedAskMeQuestions = async (): Promise<void> => {
    if (params.sectionName !== 'askmequestions') return;
    try {
      setSeeding(true);
      const res = await fetch('/api/askmequestions/seed', { method: 'POST' });
      if (!res.ok) throw new Error('Seed failed');
      const data = await res.json();
      if (data.contentItems) setContentItems(data.contentItems);
    } catch (error) {
      console.error('Error seeding askmequestions:', error);
    } finally {
      setSeeding(false);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down'): Promise<void> => {
    if (params.sectionName !== 'askmequestions') return;
    try {
      const res = await fetch('/api/askmequestions/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, direction }),
      });
      if (!res.ok) throw new Error('Reorder failed');
      const data = await res.json();
      if (data.contentItems) setContentItems(data.contentItems);
    } catch (error) {
      console.error('Error reordering:', error);
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
        <h1>
          {params.sectionName === 'askmequestions'
            ? 'Ask me questions (predefined)'
            : `${params.sectionName} Page`}
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-wrap gap-3 mb-3">
              <button
                id="addNewItemBtn"
                className="p-3 rounded text-white bg-[#39c420] hover:bg-[#39c420af]"
              >
                <Link href={`/section/${params.sectionName}/addNewItem`}>
                  add item to that section
                </Link>
              </button>
              {params.sectionName === 'askmequestions' && (
                <button
                  type="button"
                  onClick={handleSeedAskMeQuestions}
                  disabled={seeding}
                  className="p-3 rounded text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50"
                >
                  {seeding ? 'Seeding…' : 'Fill from default (10 questions)'}
                </button>
              )}
            </div>
            <div className="sectionItems flex flex-col justify-center items-center gap-[10px] w-full overflow-hidden md:grid md:grid-cols-2 md:gap-4 md:justify-center md:items-center md:w-full lg:grid lg:grid-cols-3 lg:gap-4 lg:justify-center  lg:w-full">
              {params.sectionName === 'askmequestions'
                ? (contentItems as AskMeQuestionType[])?.map((item, index) => (
                    <AskMeQuestionRow
                      key={item._id ?? index}
                      item={item}
                      sectionName={params.sectionName}
                      handleDelete={handleDelete}
                      onMoveUp={
                        index > 0
                          ? () => item._id && handleReorder(item._id, 'up')
                          : undefined
                      }
                      onMoveDown={
                        index < contentItems.length - 1
                          ? () => item._id && handleReorder(item._id, 'down')
                          : undefined
                      }
                    />
                  ))
                : contentItems?.map((item, index) => (
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


