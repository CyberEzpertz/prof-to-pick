'use server';

import prisma from '@/db/prisma/prisma';

import { revalidateTag } from 'next/cache';

export const deleteCourse = async (courseCode: string) => {
  try {
    const result = await prisma.course.update({
      where: {
        code: courseCode,
      },
      data: {
        classes: {
          deleteMany: {},
        },
        professors: {
          set: [],
        },
      },
    });

    const courseDelete = await prisma.course.delete({
      where: {
        code: courseCode,
      },
    });

    revalidateTag('courses');
    return true;
  } catch (error) {
    console.error('Error in deleting course.');
    console.error(error);
    return undefined;
  }
};
