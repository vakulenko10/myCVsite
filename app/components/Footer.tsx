import React from 'react';
import Container from './Container';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-300 py-20 pb-6">
      <Container className={`flex`}>
        <div className="developerInfo w-full flex flex-col justify-center items-center">
          <Link href="https://www.instagram.com">instagram</Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;




