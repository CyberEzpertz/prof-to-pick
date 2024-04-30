import SearchBar from '@/components/SearchBar';
import prisma from '@/db/prisma/prisma';
import { fetchAllCourses } from '@/server-actions/courses';
import { fetchAllProfs } from '@/server-actions/professors';
import { Review } from '@prisma/client';
import { unstable_cache, unstable_noStore } from 'next/cache';
import { z } from 'zod';

async function fetchData() {
  const profs = await prisma.professor.findMany();
  const courses = await prisma.course.findMany();

  return { profs, courses };
}

const getCachedCourses = unstable_cache(
  async () => fetchAllCourses(),
  ['all-courses'],
  { tags: ['courses', 'searchBar'] },
);

const getCachedProfs = unstable_cache(
  async () => fetchAllProfs(),
  ['all-profs'],
  { tags: ['professors', 'searchBar'] },
);

export default async function Home() {
  const [courses, profs] = await Promise.all([
    getCachedCourses(),
    getCachedProfs(),
  ]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 px-10">
      <SearchBar courses={courses} profs={profs} />
    </div>
  );
}
