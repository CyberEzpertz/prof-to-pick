import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewCard from '@/components/ReviewCard';
import ReviewFeed from '@/components/ReviewFeed';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/db/prisma/prisma';
import { ProfWithReviews } from '@/lib/types';
import { Review, Professor } from '@prisma/client';
import { CircleArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

async function getProfessor(id: number) {
  const prof = await prisma.professor.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true,
    },
  });

  return prof as ProfWithReviews;
}

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const getReviews = async (cursor: number) => {
    'use server';

    const reviews = await prisma.review.findMany({
      take: 10,
      ...(cursor !== -1 && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      where: {
        professorId: Number(params.id),
      },
    });

    if (reviews.length !== 0) {
      cursor = reviews?.slice(-1)?.pop()?.id ?? -1;
    }

    return { reviews, cursor };
  };

  const profData = getProfessor(Number(params.id));
  const reviewsData = getReviews(-1);

  // Parallel Data Fetching
  const [prof, { reviews, cursor }] = await Promise.all([
    profData,
    reviewsData,
  ]);

  if (!prof) redirect('/not-found');

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-[7] flex-col">
        <Link
          href="/"
          className="m-8 mb-0 flex w-max cursor-pointer flex-row gap-3 rounded-md p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
        >
          <CircleArrowLeft />
          Back to search
        </Link>
        <ScrollArea className="h-full w-full p-8 pb-0">
          <Suspense fallback={<p>Loading reviews...</p>}>
            <ReviewFeed
              initReviews={reviews}
              getReviews={getReviews}
              initCursor={cursor}
            ></ReviewFeed>
          </Suspense>
        </ScrollArea>
      </div>
      <Separator orientation="vertical" className="my-auto h-[95%]" />
      <div className="flex flex-[4] flex-col justify-center gap-6 p-8">
        <Suspense fallback={<p>Loading Professor...</p>}>
          <ProfessorInfo prof={prof} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
