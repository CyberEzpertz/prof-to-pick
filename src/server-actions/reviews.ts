'use server';

import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { reviewFormSchema } from '@/lib/types';
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

  console.log(review);
};
