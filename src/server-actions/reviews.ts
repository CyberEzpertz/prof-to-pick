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
