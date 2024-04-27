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
  ['searchbar-courses'],
  { tags: ['courses'] },
);

const getCachedProfs = unstable_cache(
  async () => fetchAllProfs(),
  ['searchbar-courses'],
  { tags: ['courses'] },
);

export default async function Home() {
  const [courses, profs] = await Promise.all([
    getCachedCourses(),
    getCachedProfs(),
  ]);

  return (
    <div className="grid w-full grid-cols-6 grid-rows-6 justify-items-center gap-6">
      <div className="col-span-4 col-start-2 row-span-2 row-start-2 flex flex-col gap-2 self-end text-center">
        <h1 className=" text-balance text-5xl font-bold">
          Audit your Professor with less hassle.
        </h1>
        <p className="text-slate-400">Just enter their name below.</p>
      </div>

      <SearchBar
        courses={courses}
        profs={profs}
        className="col-span-4 col-start-2 row-span-2 row-start-4"
      />
    </div>
  );
}
