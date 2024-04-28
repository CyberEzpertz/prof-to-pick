import CourseDelete from '@/components/CourseDelete';
import CourseSearch from '@/components/CourseSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { fetchAllCourses } from '@/server-actions/courses';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

async function checkIsAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  return user?.role === 'ADMIN';
}

const checkIsAdminCache = unstable_cache(
  async (userId: string) => checkIsAdmin(userId),
  ['isAdmin'],
  {
    revalidate: 86400,
  },
);

const getCachedCourses = unstable_cache(
  async () => fetchAllCourses(),
  ['all-courses'],
  { tags: ['courses'] },
);

const AdminPage = async () => {
  const supabase = createServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) redirect('/');

  const isAdmin = await checkIsAdminCache(data.user.id);
  const courses = await getCachedCourses();
  if (!isAdmin) redirect('/');

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
