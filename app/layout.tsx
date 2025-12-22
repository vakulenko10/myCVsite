import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import AuthProvider from './components/AuthProvider';
import Footer from './components/Footer';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'adminDashboard',
  description: 'That is the admin dashboard website',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}


