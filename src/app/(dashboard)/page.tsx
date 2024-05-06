import SearchBar from '@/components/SearchBar';
import {
  getCachedCourses,
  getCachedProfs,
  getCachedRecents,
} from '@/lib/fetch';

export default async function Home() {
  const [courses, profs, recents] = await Promise.all([
    getCachedCourses(),
    getCachedProfs(),
    getCachedRecents(),
  ]);

  console.log(courses);
  console.log(profs);
  console.log(recents);

  return (
    <div className="flex h-full w-full min-w-0 grow-0 flex-col items-center justify-center gap-4 bg-gradient bg-cover px-5 lg:px-10">
      <SearchBar recents={recents} courses={courses} profs={profs} />
    </div>
  );
}
