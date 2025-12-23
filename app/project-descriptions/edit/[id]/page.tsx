'use client';

import Container from '@/app/components/Container';
import MarkdownPreview from '@/app/components/MarkdownPreview';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import type { ProjectDescriptionType, MyPortfolioItemType } from '@/types';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [projectDescription, setProjectDescription] = useState<ProjectDescriptionType | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<MyPortfolioItemType[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('');
  const [enMarkdownContent, setEnMarkdownContent] = useState<string>('');
  const [uaMarkdownContent, setUaMarkdownContent] = useState<string>('');
  const [plMarkdownContent, setPlMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ua' | 'pl'>('en');
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/project-descriptions/edit/${params.id}`);
    },
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Fetch project description
        const descRes = await fetch(`/api/project-descriptions/${params.id}`);
        if (!descRes.ok) {
          throw new Error(`Failed to fetch project description: ${descRes.status}`);
        }
        const descData = await descRes.json();
        const description = descData.data;
        setProjectDescription(description);
        setSelectedPortfolioId(description.portfolioItemId);
        setEnMarkdownContent(description.enMarkdownContent || '');
        setUaMarkdownContent(description.uaMarkdownContent || '');
        setPlMarkdownContent(description.plMarkdownContent || '');

        // Fetch portfolio items
        const portfolioRes = await fetch('/api/fetchContentFromDB/myPortfolio');
        if (!portfolioRes.ok) {
          throw new Error(`Failed to fetch portfolio items: ${portfolioRes.status}`);
        }
        const portfolioData = await portfolioRes.json();
        setPortfolioItems(portfolioData.contentItems || []);
      } catch (error) {
        console.error('Error loading data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const getCurrentContent = (): string => {
    switch (activeLanguage) {
      case 'en':
        return enMarkdownContent;
      case 'ua':
        return uaMarkdownContent;
      case 'pl':
        return plMarkdownContent;
      default:
        return '';
    }
  };

  const setCurrentContent = (value: string): void => {
    switch (activeLanguage) {
      case 'en':
        setEnMarkdownContent(value);
        break;
      case 'ua':
        setUaMarkdownContent(value);
        break;
      case 'pl':
        setPlMarkdownContent(value);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!selectedPortfolioId) {
      alert('Please select a portfolio item');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/project-descriptions/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioItemId: selectedPortfolioId,
          enMarkdownContent: enMarkdownContent.trim(),
          uaMarkdownContent: uaMarkdownContent.trim(),
          plMarkdownContent: plMarkdownContent.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/project-descriptions');
      } else {
        alert(data.message || 'Failed to update project description');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error updating project description:', error);
      alert('An error occurred while updating the project description');
      setIsSubmitting(false);
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

  if (!projectDescription) {
    return (
      <main className="page pt-[100px] z-0">
        <Container className={'px-3 md:px-1'}>
          <p className="text-red-600">Project description not found</p>
        </Container>
      </main>
    );
  }

  return (
    <main className="page pt-[100px] z-0">
      <Container className={'px-3 md:px-1'}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-sky-900 mb-6">Edit Project Description</h1>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="portfolioItem" className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio Item *
              </label>
              <select
                id="portfolioItem"
                value={selectedPortfolioId}
                onChange={(e) => setSelectedPortfolioId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              >
                <option value="">-- Select a portfolio item --</option>
                {portfolioItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.enTitle || item.uaTitle || item.plTitle || 'Untitled Project'}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Tabs */}
            <div className="mb-4 border-b border-gray-200">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLanguage('en')}
                  className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                    activeLanguage === 'en'
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLanguage('ua')}
                  className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                    activeLanguage === 'ua'
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Українська
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLanguage('pl')}
                  className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                    activeLanguage === 'pl'
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Polski
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="markdownContent" className="block text-sm font-medium text-gray-700">
                  Markdown Content ({activeLanguage.toUpperCase()}) *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('editor')}
                    className={`px-3 py-1 text-xs rounded ${
                      viewMode === 'editor'
                        ? 'bg-sky-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1 text-xs rounded ${
                      viewMode === 'split'
                        ? 'bg-sky-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('preview')}
                    className={`px-3 py-1 text-xs rounded ${
                      viewMode === 'preview'
                        ? 'bg-sky-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Write your project description in Markdown format. You can use:
                <br />
                • Headers: # H1, ## H2, ### H3
                <br />
                • Links: [text](url)
                <br />
                • Images: ![alt](image-url)
                <br />
                • Code: `code` or ```code blocks```
                <br />
                • Lists, bold, italic, and more!
              </p>
              
              <div
                className={`${
                  viewMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'block'
                }`}
              >
                {(viewMode === 'editor' || viewMode === 'split') && (
                  <div>
                    <textarea
                      id="markdownContent"
                      value={getCurrentContent()}
                      onChange={(e) => setCurrentContent(e.target.value)}
                      rows={20}
                      className="w-full p-4 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-y min-h-[500px]"
                      placeholder="# My Project

## Overview
Describe your project here..."
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      Characters: {getCurrentContent().length}
                    </div>
                  </div>
                )}
                {(viewMode === 'preview' || viewMode === 'split') && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Preview:</div>
                    <MarkdownPreview content={getCurrentContent()} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 [background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-6 py-3 font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Project Description'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/project-descriptions')}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Page;
