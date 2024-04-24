import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewCard from '@/components/ReviewCard';
import ReviewFeed from '@/components/ReviewFeed';
import ReviewFilter from '@/components/ReviewFilter';
import { ComboBox } from '@/components/ui/combobox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/db/prisma/prisma';
import { ProfWithReviewsAndCourses } from '@/lib/types';
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
      courses: {
        select: {
          code: true,
        },
      },
    },
  });

  return prof as ProfWithReviewsAndCourses;
}

export const dynamic = 'force-dynamic';

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const offset = 10;

  const getReviews = async (cursor: number) => {
    'use server';
    const course = searchParams['course'];
    const rating = searchParams['rating'];
    const sort = searchParams['sort'];

    // When cursor === -1, that means it's the initial value (i.e. it hasn't searched for reviews yet)
    const reviews = await prisma.review.findMany({
      take: offset,
      ...(cursor !== -1 && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      where: {
        professorId: Number(params.id),
        ...(course && {
          courseCode: course as string,
        }),
        ...(rating && {
          rating: Number(rating),
        }),
      },
      orderBy: {
        ...((!sort || sort === 'recent') && {
          createdAt: 'desc',
        }),
        ...(sort === 'oldest' && {
          createdAt: 'asc',
        }),
        ...(sort === 'popular' && {
          voteCount: 'desc',
        }),
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
        <div className="m-8 mb-0 flex flex-col gap-4">
          <Link
            href="/"
            className=" flex w-max cursor-pointer flex-row gap-3 rounded-md p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
          >
            <CircleArrowLeft />
            Back to search
          </Link>
          {
            <ReviewFilter
              courses={prof.courses.map((course) => {
                return { label: course.code, value: course.code };
              })}
            />
          }
        </div>
        <ScrollArea className="h-full w-full p-8 pb-0">
          <Suspense
            fallback={<p>Loading reviews...</p>}
            key={JSON.stringify(searchParams)}
          >
            <ReviewFeed
              initReviews={reviews}
              getReviews={getReviews}
              initCursor={cursor}
              offset={offset}
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
