import CourseSearch from '@/components/CourseSearch';
import { Card } from '@/components/ui/card';
import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

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

const AdminPage = async (props: Props) => {
  const supabase = createServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) redirect('/');

  const isAdmin = await checkIsAdminCache(data.user.id);
  if (!isAdmin) redirect('/');
  console.log(isAdmin);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card className="p-8">
        <CourseSearch />
      </Card>
    </div>
  );
};

export default AdminPage;
