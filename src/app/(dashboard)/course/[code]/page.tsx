import CourseFilters from '@/components/CourseFilter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { fetchCourseWithProfessors } from '@/lib/fetch';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';
import CourseProfessors from '@/components/CourseProfessors';
import BackButton from '@/components/BackButton';

const Course = async ({
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
    },
  );

  const course = await getCachedCourse(params.code, searchParams);

  if (!course) redirect('/not-found');

  return (
    <ScrollArea className="w-full">
      <div className="space-between flex h-1/5 w-full items-center justify-between p-8 pb-0">
        <span className="inline-flex items-center gap-2">
          <BackButton />
          <h1 className="text-3xl font-extrabold text-slate-100">
            {params.code.toUpperCase()}
          </h1>
        </span>
        <CourseFilters />
      </div>
      <Separator className="my-8" />
      <CourseProfessors professors={course.professors} />
    </ScrollArea>
  );
};

export default Course;
