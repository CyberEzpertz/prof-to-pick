import BackButton from '@/components/BackButton';
import CompareCard from '@/components/CompareCard';
import CourseFilters from '@/components/CourseFilter';
import { Separator } from '@/components/ui/separator';
import { getProfReviewsCourses } from '@/lib/fetch';

export default async function Compare() {
  const prof = await getProfReviewsCourses(9, 3);
  const prof2 = await getProfReviewsCourses(1, 3);
  const prof3 = await getProfReviewsCourses(2, 3);

  if (prof === null || prof2 === null || prof3 === null) return null;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="space-between flex w-full items-center justify-between p-8">
        <span className="inline-flex items-center gap-2">
          <BackButton />
          <h1 className="text-3xl font-extrabold text-slate-100">
            Compare Professors
          </h1>
        </span>
        <CourseFilters />
      </div>
      <Separator />

      <div className="mt-12 flex h-full w-full flex-wrap items-start justify-center gap-6 overflow-scroll p-4">
        <CompareCard prof={prof} />
        <CompareCard prof={prof2} />
        <CompareCard prof={prof3} />
      </div>
    </div>
  );
}
