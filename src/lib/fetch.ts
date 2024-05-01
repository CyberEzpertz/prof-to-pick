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
    return undefined;
  }
};

export const fetchCourseWithProfessors = async (
  code: string,
  searchParams: { [key: string]: string | string[] | undefined },
) => {
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
            ...(searchParams['sort'] === 'most' && {
              reviews: {
                _count: 'desc',
              },
            }),
            lastName: 'asc',
          },
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
    return undefined;
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
};
