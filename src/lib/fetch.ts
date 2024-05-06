import 'server-only';
import prisma from '@/db/prisma/prisma';
import { createServer } from './supabase/server';
import { unstable_cache } from 'next/cache';

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
            {
              ...(searchParams['sort'] === 'highest' && {
                avgRating: { sort: 'desc', nulls: 'last' },
              }),
            },
            {
              ...(searchParams['sort'] === 'mostReviewed' && {
                reviews: {
                  _count: 'desc',
                },
              }),
            },
            {
              ...(searchParams['sort'] === 'mostDifficult' && {
                avgDifficulty: { sort: 'desc', nulls: 'last' },
              }),
            },
            {
              lastName: 'asc',
            },
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
    const professors = await prisma.professor.findMany({
      orderBy: {
        firstName: 'asc',
      },
    });
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

export async function getProfReviewsCourses(id: number, reviewLimit?: number) {
  const getCachedProf = unstable_cache(
    async () => {
      const prof = await prisma.professor.findUnique({
        where: {
          id: id,
        },
        include: {
          _count: {
            select: {
              reviews: true,
            },
          },
          reviews: {
            where: {
              mainReviewId: null,
            },
            include: {
              subReviews: {
                select: {
                  courseCode: true,
                },
              },
            },
            ...(reviewLimit !== null && {
              take: reviewLimit,
              orderBy: {
                voteCount: 'desc',
              },
            }),
          },
          courses: {
            select: {
              code: true,
            },
          },
        },
      });

      return prof;
    },
    [`professor-${id}-${reviewLimit}`],
    { tags: ['professors', `professor-${id}`] },
  );

  return getCachedProf();
}

export const getCourseCodes = async (userId?: string, profId?: number) => {
  const courses = await prisma.course.findMany({
    select: {
      code: true,
    },
    orderBy: {
      code: 'asc',
    },
    ...(userId !== undefined &&
      profId !== undefined && {
        where: {
          reviews: {
            none: {
              userId: userId,
              professorId: profId,
            },
          },
        },
      }),
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
      distinct: ['userId', 'professorId'],
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        professor: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return recents;
  } catch (error) {
    console.error(error);
    console.error('Error fetching recent reviews.');
    return null;
  }
};

export const getCurrentUserReviews = async (
  userId: string,
  skip?: number,
  take?: number,
) => {
  try {
    const reviews = prisma.review.findMany({
      ...(skip && { skip: skip }),
      ...(take && { take: take }),
      where: {
        userId: userId,
        mainReviewId: null,
      },
      include: {
        votes: {
          where: {
            userId: userId,
          },
        },
        subReviews: {
          select: {
            courseCode: true,
          },
        },
      },
    });

    return reviews;
  } catch (error) {
    console.error(`Error fetching user ${userId}'s reviews.`);
    console.error(error);

    return null;
  }
};

export const getCachedCourses = unstable_cache(
  async () => fetchAllCourses(),
  ['all-courses'],
  { tags: ['courses', 'searchBar'] },
);

export const getCachedProfs = unstable_cache(
  async () => fetchAllProfs(),
  ['all-profs'],
  { tags: ['professors', 'searchBar'] },
);

export const getCachedRecents = unstable_cache(
  async () => getRecentReviews(),
  ['recent-reviews'],
  { tags: ['reviews', 'searchBar'] },
);
