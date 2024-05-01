import CourseDelete from '@/components/CourseDelete';
import CourseSearch from '@/components/CourseSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchAllCourses } from '@/lib/fetch';
import { checkIsAdmin } from '@/server-actions/users';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

const getCachedCourses = unstable_cache(
  async () => fetchAllCourses(),
  ['all-courses'],
  { tags: ['courses'] },
);

const AdminPage = async () => {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) redirect('/');

  const courses = await getCachedCourses();

  return (
    <div className="flex w-full flex-row items-center justify-center gap-4">
      <Card className="p-8">
        <CardHeader>
          <CardTitle>Fetch Course</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseSearch />
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Delete Course</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseDelete courses={courses ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
