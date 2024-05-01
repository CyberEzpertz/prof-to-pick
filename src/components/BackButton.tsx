'use client';

import React from 'react';
import { Button } from './ui/button';
import { CircleArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = ({ text = '' }: { text?: string }) => {
  const router = useRouter();
  return (
    <Button
      onClick={router.back}
      className="flex w-max flex-row gap-3 rounded-md p-2 text-slate-500"
      variant="ghost"
    >
      <CircleArrowLeft />
      {text}
    </Button>
  );
};

export default BackButton;
