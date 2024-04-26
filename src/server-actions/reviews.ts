'use server';

import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { reviewFormSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { ReadonlyURLSearchParams, redirect } from 'next/navigation';
import { z } from 'zod';

export const createReview = async (data: z.infer<typeof reviewFormSchema>) => {
  const supabase = createServer();

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) return;

  const idNumber = await prisma.user.findUnique({
    where: {
      id: userData.user.id,
    },
    select: {
      idNumber: true,
    },
  });

  const review = await prisma.review.create({
    data: {
      comment: data.comment,
      professorId: data.professorId,
      courseCode: data.courseCode,
      difficulty: data.difficulty,
      rating: data.rating,
      modality: data.modality,
      userId: userData.user.id,
      userIdNumber: idNumber?.idNumber ?? 122,
      tags: data.tags,
    },
  });

  revalidatePath(`/professor`);
  redirect(`/professor/${data.professorId}`);
};

export const handleLike = async (
  type: 'LIKE' | 'DISLIKE',
  oldVote: boolean | undefined,
  reviewId: number,
  pathname: string,
) => {
  const supabase = createServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return;
  }

  const userId = data.user?.id as string;
  console.log(reviewId, userId);

  try {
    if (oldVote === undefined) {
      const vote = await prisma.vote.create({
        data: {
          isLike: type === 'LIKE',
          reviewId: reviewId,
          userId: userId,
        },
      });

      return vote;
    }

    // Checks if they have the same value
    if (oldVote === (type === 'LIKE')) {
      const vote = await prisma.vote.delete({
        where: {
          userId_reviewId: {
            reviewId: reviewId,
            userId: userId,
          },
        },
      });

      return vote;
    }

    // This section will only execute when the old vote and new vote are different

    const vote = await prisma.vote.update({
      where: {
        userId_reviewId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
      data: {
        isLike: type === 'LIKE',
      },
    });

    return vote;
  } catch (error) {
    console.error('Encountered problem in liking/disliking');
    console.error(error);
  } finally {
    revalidatePath('/professor');
    redirect(pathname);
  }
};

export const fetchReviews = async (
  professorId: number,
  cursor: number,
  searchParamsString: string,
) => {
  // Offset is how many posts to load per page scroll.
  const offset = 10;
  const searchParams = new URLSearchParams(searchParamsString);

  console.log(professorId, cursor, searchParamsString);

  // Get Search Parameters
  const course = searchParams.get('course');
  const rating = searchParams.get('rating');
  const sort = searchParams.get('sort');

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
      professorId: professorId,
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

  console.log(cursor);

  return reviews;
};
