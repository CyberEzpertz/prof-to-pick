import SearchBar from '@/components/SearchBar';
import prisma from '@/db/prisma/prisma';
import {
  fetchAllCourses,
  fetchAllProfs,
  getRecentReviews as fetchRecentReviews,
} from '@/lib/fetch';
import { unstable_cache } from 'next/cache';

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
  { tags: ['professors', 'searchBar'], revalidate: 1 },
);

const getCachedRecents = unstable_cache(
  async () => fetchRecentReviews(),
  ['recent-reviews'],
  { tags: ['reviews', 'searchBar'] },
);

export default async function Home() {
  const [courses, profs, recents] = await Promise.all([
    getCachedCourses(),
    getCachedProfs(),
    getCachedRecents(),
  ]);

  return (
    <div className="bg-gradient flex h-full w-full min-w-0 grow-0 flex-col items-center justify-center gap-4 bg-cover px-5 lg:px-10">
      <SearchBar recents={recents} courses={courses} profs={profs} />
    </div>
  );
}
