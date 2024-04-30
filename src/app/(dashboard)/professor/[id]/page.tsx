import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewCard from '@/components/ReviewCard';
import ReviewFeed from '@/components/ReviewFeed';
import ReviewFilter from '@/components/ReviewFilter';
import ReviewForm from '@/components/ReviewForm';
import ReviewCardSkeleton from '@/components/skeletons/ReviewCardSkeleton';

import { Button } from '@/components/ui/button';
import { ComboBox } from '@/components/ui/combobox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { ProfWithReviewsAndCourses } from '@/lib/types';
import { Review, Professor } from '@prisma/client';
import { CircleArrowLeft, CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import { number } from 'zod';
import Loading from './loading';
import { getCurrUserId } from '@/server-actions/users';

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
  const profId = Number(params.id);
  const offset = 10;

  const getReviews = async (cursor: number) => {
    'use server';
    const course = searchParams['course'];
    const rating = searchParams['rating'];
    const sort = searchParams['sort'];
    const supabase = createServer();
    const { data, error } = await supabase.auth.getUser();
    const user = data.user?.id as string;

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
        professorId: profId,
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
      include: {
        votes: {
          where: {
            userId: user,
          },
        },
      },
    });

    if (reviews.length !== 0) {
      cursor = reviews?.slice(-1)?.pop()?.id ?? -1;
    }

    return { reviews, cursor };
  };

  const getCourses = async () => {
    const courses = await prisma.course.findMany({
      select: {
        code: true,
      },
    });

    return courses.map((course) => course.code);
  };

  const getReviewCourses = async () => {
    const reviewCourses = await prisma.review.groupBy({
      by: ['courseCode'],
      where: {
        professorId: profId,
      },
      _count: {
        id: true,
      },
    });

    return reviewCourses;
  };

  // Parallel Data Fetching
  const [prof, { reviews, cursor }, courses, reviewCourses, userId] =
    await Promise.all([
      getProfessor(profId),
      getReviews(-1),
      getCourses(),
      getReviewCourses(),
      getCurrUserId(),
    ]);

  if (!prof) redirect('/not-found');

  // return <Loading />;

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="order-3 flex w-full flex-[7] flex-col lg:order-1">
        <div className="m-8 mb-0 flex flex-col gap-4 ">
          <Link
            href="/"
            className="flex w-max cursor-pointer flex-row gap-3 rounded-md p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
          >
            <CircleArrowLeft />
            Back to search
          </Link>
          <div className="flex flex-row gap-4">
            <ReviewForm
              profId={prof.id}
              profName={`${prof.firstName} ${prof.lastName}`}
              courses={courses}
            />
            <ReviewFilter
              courses={reviewCourses.map((course) => {
                return {
                  label: `${course.courseCode} (${course._count.id})`,
                  value: course.courseCode,
                };
              })}
            />
          </div>
        </div>
        <ScrollArea className="h-full w-full p-8 pb-0">
          <ReviewFeed
            initReviews={reviews}
            getReviews={getReviews}
            initCursor={cursor}
            offset={offset}
            userId={userId}
          />
        </ScrollArea>
      </div>
      <Separator className="order-2 mx-auto h-[1px] w-[80%] lg:my-auto lg:h-[95%] lg:w-[1px]" />
      <div className="order-1 gap-6 p-8 lg:order-3 lg:flex lg:flex-[4] lg:flex-col lg:justify-center">
        <ProfessorInfo prof={prof} />
      </div>
    </div>
  );
};

export default page;
