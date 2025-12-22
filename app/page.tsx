'use client';

import Container from './components/Container';
import { useSession } from 'next-auth/react';

export default function Home(): JSX.Element {
  const { data: session } = useSession();
  console.log('Session:', session);

  return (
    <main className="page pt-[100px] z-0">
      <Container className={'px-3 md:px-1'}>
        <h1>Hi there!</h1>
      </Container>
    </main>
  );
}


