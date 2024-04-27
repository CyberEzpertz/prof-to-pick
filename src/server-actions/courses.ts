'use server';

import prisma from '@/db/prisma/prisma';

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
