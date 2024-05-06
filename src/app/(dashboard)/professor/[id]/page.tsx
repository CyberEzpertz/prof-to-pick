import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewFeed from '@/components/ReviewFeed';
import ReviewFilter from '@/components/ReviewFilter';
import ReviewForm from '@/components/ReviewForm';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/db/prisma/prisma';
import { redirect } from 'next/navigation';
import {
  getCourseCodes,
  getCurrUserId,
  getProfReviewsCourses,
  getReviewCourses,
} from '@/lib/fetch';
import BackButton from '@/components/BackButton';
import { unstable_cache } from 'next/cache';
import { checkIsAdmin } from '@/server-actions/users';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const profId = Number(params.id);
  const offset = 10;
  const userId = await getCurrUserId();

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
        mainReviewId: null,
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
            userId: userId,
          },
        },
        subReviews: {
          select: {
            courseCode: true,
          },
        },
      },
    });

    if (reviews.length !== 0) {
      cursor = reviews?.slice(-1)?.pop()?.id ?? -1;
    }

    return { reviews, cursor };
  };

  const cachedProfessorData = unstable_cache(
    async () => {
      return Promise.all([
        getProfReviewsCourses(profId),
        getReviewCourses(profId),
        getCourseCodes(),
      ]);
    },
    [`professor-${profId}`],
    { tags: [`professor-${profId}`, 'professors'] },
  );

  // Parallel Data Fetching
  const [
    [prof, reviewCourses, courses],
    { reviews, cursor },
    unreviewedCourses,
  ] = await Promise.all([
    cachedProfessorData(),
    getReviews(-1),
    getCourseCodes(userId, profId),
  ]);

  if (!prof) redirect('/not-found');

  return (
    <div className="flex w-full grow-0 flex-col lg:flex-row">
      <div className="order-3 flex w-full flex-[7] shrink flex-col overflow-scroll lg:order-1">
        <div className="m-8 mb-0 flex flex-col gap-4 ">
          <BackButton text="Go Back" />
          <div className="flex min-w-0 shrink flex-row gap-4">
            <ReviewForm profId={prof.id} courses={unreviewedCourses}>
              <Button variant="default" className="gap-2">
                <CirclePlus />
                Add Review
              </Button>
            </ReviewForm>
            <div className="ml-auto overflow-scroll">
              <ReviewFilter
                courses={
                  reviewCourses?.map((course) => ({
                    label: `${course.courseCode} (${course._count.id})`,
                    value: course.courseCode,
                  })) ?? []
                }
              />
            </div>
          </div>
        </div>
        <ScrollArea className="h-full w-full p-8 pb-0">
          <ReviewFeed
            initReviews={reviews}
            getReviews={getReviews}
            initCursor={cursor}
            offset={offset}
            userId={userId}
            isAdmin={await checkIsAdmin()}
            courses={courses}
          />
        </ScrollArea>
      </div>
      <Separator className="order-2 mx-auto h-[1px] w-[80%] lg:my-auto lg:h-[95%] lg:w-[1px]" />
      <div className="order-1 h-max shrink-0 overflow-y-scroll p-8 lg:order-3 lg:flex lg:h-full lg:max-w-[550px] lg:flex-[4] lg:flex-col">
        <ProfessorInfo prof={prof} />
      </div>
    </div>
  );
};

export default page;
