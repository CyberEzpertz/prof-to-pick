'use server';

import prisma from '@/db/prisma/prisma';
import { revalidateTag } from 'next/cache';

export const fetchAllCourses = async () => {
  try {
    const courses = await prisma.course.findMany();
    return courses;
  } catch (error) {
    console.error('Error fetching all courses');
    console.error(error);
    return undefined;
  }
};

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
