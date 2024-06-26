'use client';
import React from 'react';
import { Button } from './ui/button';
import { CircleMinus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  id: string;
};

const RemoveCompare = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Button
      className="flex w-full shrink-0 flex-row items-center text-slate-500 dark:hover:bg-rose-800"
      variant="ghost"
      onClick={() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('profs', id);
        router.replace(`${pathname}?${params.toString()}`);
      }}
    >
      <CircleMinus size={16} className="mr-2" /> Remove
    </Button>
  );
};

export default RemoveCompare;
