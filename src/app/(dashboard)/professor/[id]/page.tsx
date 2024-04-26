import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewCard from '@/components/ReviewCard';
import ReviewFeed from '@/components/ReviewFeed';
import ReviewFilter from '@/components/ReviewFilter';
import ReviewForm from '@/components/ReviewForm';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ComboBox } from '@/components/ui/combobox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { ProfWithReviewsAndCourses } from '@/lib/types';
import { fetchReviews } from '@/server-actions/reviews';
import { Review, Professor } from '@prisma/client';
import { CircleArrowLeft, CirclePlus } from 'lucide-react';
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

async function getCourses() {
  const courses = await prisma.course.findMany({
    select: {
      code: true,
    },
  });

  return courses.map((course) => course.code);
}

export const dynamic = 'force-dynamic';

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const reviewsData = fetchReviews(
    Number(params.id),
    -1,
    new URLSearchParams(
      (searchParams as { [key: string]: string }) ?? {},
    ).toString(),
  );
  const coursesData = getCourses();
  const profData = getProfessor(Number(params.id));

  // Parallel Data Fetching
  const [prof, reviews, courses] = await Promise.all([
    profData,
    reviewsData,
    coursesData,
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
          <div className="flex flex-row">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default" className="mr-auto gap-2">
                  <CirclePlus />
                  Add Review
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-1/2 h-max w-1/2">
                <AlertDialogHeader>
                  <AlertDialogTitle>Writing a Review</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`You're now writing a review for ${`${prof.firstName} ${prof.lastName}`}`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <ReviewForm courses={courses} profId={1} />
              </AlertDialogContent>
            </AlertDialog>
            <ReviewFilter
              courses={prof.courses.map((course) => {
                return { label: course.code, value: course.code };
              })}
            />
          </div>
        </div>
        <ScrollArea className="h-full w-full p-8 pb-0">
          <Suspense
            fallback={<p>Loading reviews...</p>}
            key={JSON.stringify(searchParams)}
          >
            <ReviewFeed professorId={prof.id} initReviews={reviews} />
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
