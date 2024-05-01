import 'server-only';
import prisma from '@/db/prisma/prisma';
import { createServer } from './supabase/server';

export const fetchAllCourses = async () => {
  try {
    const courses = await prisma.course.findMany();
    return courses;
  } catch (error) {
    console.error('Error fetching all courses');
    console.error(error);
    return null;
  }
};

export const fetchCourseWithProfessors = async (
  code: string,
  searchParams: { [key: string]: string | string[] | undefined },
) => {
  try {
    let tier;

    switch (searchParams['tier']) {
      case 'W':
        tier = { gte: 3.67 };
        break;
      case 'M':
        tier = { gte: 2.33, lt: 3.67 };
        break;
      case 'L':
        tier = { gte: 1, lt: 2.33 };
        break;
      default:
        tier = null;
    }

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
          where: {
            avgRating: {
              ...(tier !== null && tier),
            },
          },
          orderBy: [
            searchParams['sort'] === 'most'
              ? {
                  reviews: {
                    _count: 'desc',
                  },
                }
              : { lastName: 'asc' },
          ],
          include: {
            _count: {
              select: {
                reviews: true,
              },
            },
          },
        },
      },
    });

    if (course === null) return null;

    return course;
  } catch (error) {
    console.error('Error fetching course');
    console.error(error);
    return null;
  }
};

export const fetchAllProfs = async () => {
  try {
    const professors = await prisma.professor.findMany();
    return professors;
  } catch (error) {
    console.error('Error fetching all professors');
    console.error(error);
    return null;
  }
};

export async function getCurrUserId() {
  const supabase = createServer();

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) throw new Error('Failed to validate user');

  return userData.user.id;
}

export async function getProfessor(id: number) {
  const prof = await prisma.professor.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true,
      courses: {
        select: {
          code: true,
        },
      },
    },
  });

  return prof;
}

export const getCoursesCodes = async () => {
  const courses = await prisma.course.findMany({
    select: {
      code: true,
    },
  });

  return courses.map((course) => course.code);
};

export const getReviewCourses = async (profId: number) => {
  try {
    const reviewCourses = await prisma.review.groupBy({
      by: ['courseCode'],
      where: {
        professorId: profId,
      },
      _count: {
        id: true,
      },
    });

    return reviewCourses;
  } catch (error) {
    console.error(error);
    console.error('Error fetching review courses.');
    return null;
  }
};

export const getRecentReviews = async () => {
  try {
    const recents = await prisma.review.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return recents;
  } catch (error) {
    console.error(error);
    console.error('Error fetching recent reviews.');
    return null;
  }
};