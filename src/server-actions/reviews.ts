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
        votes: {
          create: {
            isLike: true,
            userId: userData.user.id,
          },
        },
      },
    })
    .then(async (review) => {
      console.log(data.subCourses);
      if (data.subCourses.length > 0) {
        const subReviews = await prisma.review.createMany({
          data: data.subCourses.map((course) => ({
            courseCode: course,
            professorId: data.professorId,
            userId: userData.user.id,
            mainReviewId: review.id,
          })),
        });
      }

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
      revalidateTag('reviews');
      revalidateTag(`professor-${data.professorId}`);
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
    revalidateTag(`professor-${review.professorId}`);

    return true;
  } catch (error) {
    console.error('Failed to delete post');
    console.error(error);
    return undefined;
  } finally {
    revalidateTag('reviews');
    revalidatePath('/professor');
  }
};

export const updateReview = async (
  data: z.infer<typeof reviewFormSchema>,
  reviewId: number,
) => {
  const supabase = createServer();

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) return undefined;

  const success = await prisma.review
    .update({
      where: {
        id: reviewId,
        userId: userData.user.id,
      },
      data: {
        comment: data.comment,
        difficulty: data.difficulty,
        rating: data.rating,
        modality: data.modality,
        tags: data.tags,
      },
    })
    .then(async (review) => {
      await prisma.review.deleteMany({
        where: {
          mainReviewId: review.id,
        },
      });

      if (data.subCourses.length > 0) {
        await prisma.review.createMany({
          data: data.subCourses.map((course) => ({
            courseCode: course,
            professorId: data.professorId,
            userId: userData.user.id,
            mainReviewId: review.id,
          })),
        });
      }

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
      revalidateTag('reviews');
      revalidateTag(`professor-${data.professorId}`);
      revalidatePath(`/professor`);
    });

  return success;
};
