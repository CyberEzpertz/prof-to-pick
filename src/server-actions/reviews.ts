'use server';

import prisma from '@/db/prisma/prisma';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const getReviews = async (
  id: string,
  cursor: number,
  searchParams: { [key: string]: string | string[] | undefined },
) => {
  const course = searchParams['course'];
  const rating = searchParams['rating'];
  const sort = searchParams['sort'];

  // When cursor === -1, that means it's the initial value (i.e. it hasn't searched for reviews yet)
  const reviews = await prisma.review.findMany({
    take: 10,
    ...(cursor !== -1 && {
      skip: 1,
      cursor: {
        id: cursor,
      },
    }),
    where: {
      professorId: Number(id),
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
