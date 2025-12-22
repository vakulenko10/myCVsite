'use client';

import React from 'react';
import { sectionsLinks } from './mainvars';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type { SectionName } from '@/types';

interface LinksContainerProps {
  isSmallHeaderActive: boolean;
  setIsSmallHeaderActive: (value: boolean) => void;
}

const LinksContainer: React.FC<LinksContainerProps> = ({
  isSmallHeaderActive,
  setIsSmallHeaderActive,
}) => {
  const session = useSession();

  if (session.status !== 'authenticated') {
    return (
      <div
        className={`md:block ${
          isSmallHeaderActive
            ? `absolute inset-x-0 inset-y-0 pt-10 p-3 bg-[#f8f8f8d9]  h-fit md:block md:relative md:bg-inherit md:p-0`
            : `hidden`
        } `}
      >
        <ul
          className={`md:bg-transparent ${
            isSmallHeaderActive
              ? `flex flex-col md:flex md:flex-row md:p-0 md:gap-[10px] md:bg-transparent `
              : `md:flex md:gap-[10px]`
          } `}
        >
          <Link
            onClick={() => setIsSmallHeaderActive(false)}
            href={`/api/auth/signin?callbackUrl=/`}
            className={`transition duration-200 ease-linear ${
              isSmallHeaderActive
                ? `md:bg-transparent p-5 hover:bg-white md:hover:bg-transparent md:hover:text-[#00000080] md:p-0 `
                : `md:hover:text-[#00000080]`
            }`}
          >
            Login
          </Link>
        </ul>
      </div>
    );
  }

  return (
    <div
      className={`md:block ${
        isSmallHeaderActive
          ? `absolute inset-x-0 inset-y-0 pt-10 p-3 bg-[#f8f8f8]  h-fit md:block md:relative md:bg-inherit md:p-0`
          : `hidden`
      } `}
    >
      <ul
        className={`md:bg-transparent ${
          isSmallHeaderActive
            ? `flex flex-col md:flex md:flex-row md:p-0 md:gap-[10px] md:bg-transparent `
            : `md:flex md:gap-[10px]`
        } `}
      >
        <Link
          onClick={() => setIsSmallHeaderActive(false)}
          href={`/`}
          className={`transition duration-200 ease-linear ${
            isSmallHeaderActive
              ? `md:bg-transparent p-5 hover:bg-white md:hover:bg-transparent md:hover:text-[#00000080] md:p-0 `
              : `md:hover:text-[#00000080]`
          }`}
        >
          Home
        </Link>
        {sectionsLinks.map((link: SectionName, index: number) => (
          <Link
            key={index}
            onClick={() => setIsSmallHeaderActive(false)}
            href={`/section/${link}`}
            className={`transition duration-200 ease-linear ${
              isSmallHeaderActive
                ? `md:bg-transparent p-5 hover:bg-white md:hover:bg-transparent md:hover:text-[#00000080] md:p-0 `
                : `md:hover:text-[#00000080]`
            }`}
          >
            {link}
          </Link>
        ))}
        <Link
          onClick={() => setIsSmallHeaderActive(false)}
          href={`/api/auth/signout?callbackUrl=/`}
          className={`transition duration-200 ease-linear ${
            isSmallHeaderActive
              ? `md:bg-transparent p-5 hover:bg-white md:hover:bg-transparent md:hover:text-[#00000080] md:p-0 `
              : `md:hover:text-[#00000080]`
          }`}
        >
          Logout
        </Link>
      </ul>
    </div>
  );
};

export default LinksContainer;


