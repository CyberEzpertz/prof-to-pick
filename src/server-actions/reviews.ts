'use server';

import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { reviewFormSchema } from '@/lib/types';
import { Prisma } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';

export const createReview = async (data: z.infer<typeof reviewFormSchema>) => {
  const supabase = createServer();

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) return undefined;

  const idNumber = await prisma.user.findUnique({
    where: {
      id: userData.user.id,
    },
    select: {
      idNumber: true,
    },
  });

  const success = await prisma.review
    .create({
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
    })
    .then(async (review) => {
      const vote = await prisma.vote.create({
        data: {
          isLike: true,
          reviewId: review.id,
          userId: userData.user.id,
        },
      });
      revalidateTag('reviews');

      return true;
    })
    .catch((error) => {
      console.error('Something happened during submission of review.');
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'P2002';
        }
      }
      return false;
    })
    .finally(() => {
      revalidatePath(`/professor`);
    });

  return success;
};

export const deleteReview = async (reviewId: number) => {
  // verification step
  const supabase = createServer();

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Failed to validate user.');
    console.error(error);
    return undefined;
  }

  try {
    const review = await prisma.review.delete({
      where: {
        id: reviewId,
        userId: userData.user.id,
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to delete post');
    console.error(error);
    return undefined;
  } finally {
    revalidatePath('/professor');
  }
};
