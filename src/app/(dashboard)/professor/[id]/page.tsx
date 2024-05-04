import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewFeed from '@/components/ReviewFeed';
import ReviewFilter from '@/components/ReviewFilter';
import ReviewForm from '@/components/ReviewForm';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/db/prisma/prisma';
import { redirect } from 'next/navigation';
import {
  getCoursesCodes,
  getCurrUserId,
  getProfReviewsCourses,
  getReviewCourses,
} from '@/lib/fetch';
import BackButton from '@/components/BackButton';
import { unstable_cache } from 'next/cache';
import { checkIsAdmin } from '@/server-actions/users';

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
      },
    });

    if (reviews.length !== 0) {
      cursor = reviews?.slice(-1)?.pop()?.id ?? -1;
    }

    return { reviews, cursor };
  };

  const cachedData = unstable_cache(
    async () => {
      return Promise.all([
        getProfReviewsCourses(profId),
        getCoursesCodes(),
        getReviewCourses(profId),
      ]);
    },
    [`professor-${profId}`],
    { tags: [`professor-${profId}`, 'professors'] },
  );

  // Parallel Data Fetching
  const [[prof, courses, reviewCourses], { reviews, cursor }] =
    await Promise.all([cachedData(), getReviews(-1)]);

  if (!prof) redirect('/not-found');

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="order-3 flex w-full flex-[7] flex-col lg:order-1">
        <div className="m-8 mb-0 flex flex-col gap-4 ">
          <BackButton text="Go Back" />
          <div className="flex flex-row gap-4">
            <ReviewForm
              profId={prof.id}
              profName={`${prof.firstName} ${prof.lastName}`}
              courses={courses}
            />
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
        <ScrollArea className="h-full w-full p-8 pb-0">
          <ReviewFeed
            initReviews={reviews}
            getReviews={getReviews}
            initCursor={cursor}
            offset={offset}
            userId={userId}
            isAdmin={await checkIsAdmin()}
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
