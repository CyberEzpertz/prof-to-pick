import ProfessorCard from '@/components/ProfessorCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { fetchCourseWithProfessors } from '@/server-actions/courses';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const page = async ({
  params,
  searchParams,
}: {
  params: { code: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const getCachedCourse = unstable_cache(
    fetchCourseWithProfessors,
    [params.code],
    {
      tags: ['courses', params.code],
      revalidate: 5,
    },
  );

  const { course, professors } = await getCachedCourse(params.code);

  if (!course) redirect('/not-found');

  return (
    <ScrollArea className="w-full">
      <div className="flex h-1/5 w-full items-center justify-center p-8">
        <h1 className="text-6xl font-extrabold">{params.code.toUpperCase()}</h1>
        {course.title && <p>{course.title}</p>}
        {course.description && <p>{course.description}</p>}
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap items-start justify-center gap-8 p-8">
        {professors.map((professor) => {
          return (
            <ProfessorCard
              key={professor.id}
              prof={professor}
              totalReviews={course._count.professors}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default page;
