'use server';

import prisma from '@/db/prisma/prisma';
import { getAggregates, getTier } from '@/lib/utils';
import { Professor } from '@prisma/client';
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
export const fetchCourseWithProfessors = async (code: string) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        code: code,
      },
      include: {
        _count: {
          select: {
            professors: true,
          },
        },
        professors: {
          orderBy: {
            lastName: 'asc',
          },
          select: {
            _count: {
              select: {
                reviews: true,
              },
            },
            id: true,
            firstName: true,
            lastName: true,
            tags: true,
            reviews: {
              select: {
                rating: true,
                difficulty: true,
              },
            },
          },
        },
      },
    });

    if (course === null) return { course: null, professors: null };

    const professors = course.professors.map((prof) => {
      const agg = getAggregates(prof.reviews);
      const tier = getTier(agg.rating, prof.reviews.length);
      return {
        ...prof,
        aveRating: agg.rating,
        aveDifficulty: agg.diff,
        tier: tier,
      };
    });

    return { course, professors };
  } catch (error) {
    console.error('Error fetching course');
    console.error(error);
    return { course: null, professors: null };
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
