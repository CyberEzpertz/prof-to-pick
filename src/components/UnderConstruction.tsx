import { Construction } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';

const UnderConstruction = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Construction size={128} color="#f43f5e" />
      <h1 className="text-4xl font-extrabold text-slate-200">
        Whoops, nothing to see here... yet.
      </h1>
      <p className="mb-4 p-2 text-slate-400">
        This page is currently under construction, try coming back at a later
        date.
      </p>
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        Go Back Home
      </Link>
    </div>
  );
};

export default UnderConstruction;
