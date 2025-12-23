'use client';

import Container from '@/app/components/Container';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import type { MyPortfolioItemType, ProjectDescriptionType } from '@/types';
import Link from 'next/link';

const Page: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<MyPortfolioItemType[]>([]);
  const [projectDescriptions, setProjectDescriptions] = useState<ProjectDescriptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/project-descriptions`);
    },
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Fetch portfolio items
        const portfolioRes = await fetch('/api/fetchContentFromDB/myPortfolio');
        if (!portfolioRes.ok) {
          throw new Error(`Failed to fetch portfolio items: ${portfolioRes.status}`);
        }
        const portfolioData = await portfolioRes.json();
        setPortfolioItems(portfolioData.contentItems || []);

        // Fetch project descriptions
        const descriptionsRes = await fetch('/api/project-descriptions');
        if (!descriptionsRes.ok) {
          throw new Error(`Failed to fetch project descriptions: ${descriptionsRes.status}`);
        }
        const descriptionsData = await descriptionsRes.json();
        setProjectDescriptions(descriptionsData.data || []);
      } catch (error) {
        console.error('Error loading data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDescriptionForPortfolio = (portfolioId: string | undefined): ProjectDescriptionType | undefined => {
    if (!portfolioId) return undefined;
    return projectDescriptions.find((desc) => desc.portfolioItemId === portfolioId);
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this project description?')) {
      return;
    }

    try {
      const response = await fetch(`/api/project-descriptions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjectDescriptions((prev) => prev.filter((desc) => desc._id !== id));
      } else {
        console.error('Failed to delete project description');
      }
    } catch (error) {
      console.error('Error deleting project description:', error);
    }
  };

  if (loading) {
    return (
      <main className="page pt-[100px] z-0">
        <Container className={'px-3 md:px-1'}>
          <div className="flex space-x-2 justify-center items-center">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="page pt-[100px] z-0">
      <Container className={'px-3 md:px-1'}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-sky-900 mb-4">Project Descriptions</h1>
          <Link
            href="/project-descriptions/add"
            className="inline-block [background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-6 py-2 font-bold rounded-md hover:opacity-80"
          >
            + Add New Project Description
          </Link>
        </div>

        <div className="space-y-4">
          {portfolioItems.length === 0 ? (
            <p className="text-gray-600">No portfolio items found. Create portfolio items first.</p>
          ) : (
            portfolioItems.map((item) => {
              const description = getDescriptionForPortfolio(item._id);
              return (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-sky-900 mb-2">
                        {item.enTitle || item.uaTitle || item.plTitle || 'Untitled Project'}
                      </h3>
                      {description ? (
                        <div className="mt-4">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Has Description
                          </span>
                          {(description.enMarkdownContent ||
                            description.uaMarkdownContent ||
                            description.plMarkdownContent) && (
                            <p className="text-gray-700 mt-2 text-sm line-clamp-3">
                              {(
                                description.enMarkdownContent ||
                                description.uaMarkdownContent ||
                                description.plMarkdownContent ||
                                ''
                              ).substring(0, 150)}
                              ...
                            </p>
                          )}
                          <div className="mt-4 flex gap-2">
                            <Link
                              href={`/project-descriptions/edit/${description._id}`}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit Description
                            </Link>
                            <button
                              onClick={() => handleDelete(description._id!)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            No Description
                          </span>
                          <Link
                            href={`/project-descriptions/add?portfolioId=${item._id}`}
                            className="block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                          >
                            + Add Description
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Container>
    </main>
  );
};

export default Page;

