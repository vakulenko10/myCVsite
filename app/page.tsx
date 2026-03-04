'use client';

import Container from './components/Container';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { sectionsLinks, sectionDisplayNames } from './components/mainvars';
import type { SectionName } from '@/types';

export default function Home(): JSX.Element {
  const { status } = useSession();

  return (
    <main className="page pt-[100px] z-0 pb-12">
      <Container className="px-3 md:px-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        {status === 'authenticated' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectionsLinks.map((section: SectionName) => (
              <Link
                key={section}
                href={section === 'askmequestions' ? '/askmequestions' : `/section/${section}`}
                className="block p-5 rounded-xl bg-white shadow hover:shadow-md border border-gray-100 transition"
              >
                <h2 className="font-semibold text-gray-900">
                  {sectionDisplayNames[section]}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage {sectionDisplayNames[section].toLowerCase()} content
                </p>
              </Link>
            ))}
            <Link
              href="/project-descriptions"
              className="block p-5 rounded-xl bg-white shadow hover:shadow-md border border-gray-100 transition"
            >
              <h2 className="font-semibold text-gray-900">Project Descriptions</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage markdown project descriptions
              </p>
            </Link>
          </div>
        ) : (
          <p className="text-gray-600">Sign in to manage content.</p>
        )}
      </Container>
    </main>
  );
}


