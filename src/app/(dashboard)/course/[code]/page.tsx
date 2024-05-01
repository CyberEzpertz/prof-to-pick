import CourseFilters from '@/components/CourseFilter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { fetchCourseWithProfessors } from '@/lib/fetch';
import { CircleArrowLeft } from 'lucide-react';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import CourseProfessors from '@/components/CourseProfessors';

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

  const course = await getCachedCourse(params.code, searchParams);

  if (!course) redirect('/not-found');

  return (
    <ScrollArea className="w-full">
      <div className="space-between flex h-1/5 w-full items-center justify-between p-8 pb-0">
        <span className="inline-flex items-center gap-2">
          <Link
            href="/"
            className="flex w-max cursor-pointer flex-row gap-3 rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-100"
          >
            <CircleArrowLeft />
          </Link>
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

export default page;
