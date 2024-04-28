'use server';

import { reportFormSchema } from '@/lib/types';
import { z } from 'zod';
import { getCurrUserId } from './users';
import prisma from '@/db/prisma/prisma';

export const createReport = async (data: z.infer<typeof reportFormSchema>) => {
  const userId = await getCurrUserId();

  try {
    const report = await prisma.report.create({
      data: {
        reportType: data.reportType,
        reason: data.reason,
        reviewId: data.reviewId,
        userId: userId,
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to create report.');
    console.error(error);
    return false;
  }
};
