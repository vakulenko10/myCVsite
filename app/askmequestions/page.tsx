'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

/**
 * Dedicated route for "Ask me questions" – redirects to the section page
 * so the dashboard has a clear place to add/edit predefined chat questions.
 */
export default function AskMeQuestionsPage(): JSX.Element {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace(`/api/auth/signin?callbackUrl=/askmequestions`);
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/section/askmequestions');
    }
  }, [router, status]);

  return (
    <main className="page pt-[100px] z-0 flex items-center justify-center">
      <p className="text-gray-600">Redirecting to Ask me questions…</p>
    </main>
  );
}
