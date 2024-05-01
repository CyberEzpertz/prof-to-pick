'use server';

import prisma from '@/db/prisma/prisma';
import { revalidateTag } from 'next/cache';

export const deleteProfsWithNoCourses = async () => {
  try {
    const professors = await prisma.professor.deleteMany({
      where: {
        courses: {
          none: {},
        },
      },
    });

    revalidateTag('professors');
    return professors;
  } catch (error) {
    console.error('Error deleting professors with no courses.');
    console.error(error);
    return undefined;
  }
};
