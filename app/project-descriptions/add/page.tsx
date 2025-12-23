'use client';

import Container from '@/app/components/Container';
import MarkdownPreview from '@/app/components/MarkdownPreview';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import type { MyPortfolioItemType } from '@/types';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<MyPortfolioItemType[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const searchParams = useSearchParams();
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/project-descriptions/add`);
    },
  });

  useEffect(() => {
    const fetchPortfolioItems = async (): Promise<void> => {
      try {
        const res = await fetch('/api/fetchContentFromDB/myPortfolio');
        if (!res.ok) {
          throw new Error(`Failed to fetch portfolio items: ${res.status}`);
        }
        const data = await res.json();
        setPortfolioItems(data.contentItems || []);

        // If portfolioId is in URL params, set it
        const portfolioIdParam = searchParams?.get('portfolioId');
        if (portfolioIdParam) {
          setSelectedPortfolioId(portfolioIdParam);
        }
      } catch (error) {
        console.error('Error loading portfolio items: ', error);
      }
    };

    fetchPortfolioItems();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!selectedPortfolioId || !markdownContent.trim()) {
      alert('Please select a portfolio item and enter markdown content');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/project-descriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioItemId: selectedPortfolioId,
          markdownContent: markdownContent.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/project-descriptions');
      } else {
        alert(data.message || 'Failed to create project description');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating project description:', error);
      alert('An error occurred while creating the project description');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-sky-900 mb-6">Add Project Description</h1>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="portfolioItem" className="block text-sm font-medium text-gray-700 mb-2">
                Select Portfolio Item *
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
                    {item.enTitle || item.uaTitle || item.plTitle || 'Untitled Project'} ({item._id})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="markdownContent" className="block text-sm font-medium text-gray-700">
                  Markdown Content *
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
                      value={markdownContent}
                      onChange={(e) => setMarkdownContent(e.target.value)}
                      rows={20}
                      className="w-full p-4 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-y min-h-[500px]"
                      placeholder="# My Project

## Overview
Describe your project here...

## Features
- Feature 1
- Feature 2

## Technologies Used
- Technology 1
- Technology 2

![Project Screenshot](https://example.com/image.png)

[View Live Demo](https://example.com)"
                      required
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      Characters: {markdownContent.length}
                    </div>
                  </div>
                )}
                {(viewMode === 'preview' || viewMode === 'split') && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Preview:</div>
                    <MarkdownPreview content={markdownContent} />
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
                {isSubmitting ? 'Creating...' : 'Create Project Description'}
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
    </div>
  );
};

export default Page;

