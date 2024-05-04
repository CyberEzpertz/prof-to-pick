import BackButton from '@/components/BackButton';
import { Separator } from '@/components/ui/separator';
import { getCachedProfs, getProfReviewsCourses } from '@/lib/fetch';
import CmdkDialogBtn from '@/components/CmdkDialogBtn';
import { redirect } from 'next/navigation';
import CompareCard from '@/components/CompareCard';
import { BadgePlus } from 'lucide-react';
import { toProperCase } from '@/lib/utils';

export default async function Compare({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const profNames = await getCachedProfs();
  const profParams =
    searchParams['profs'] === undefined
      ? []
      : typeof searchParams['profs'] === 'string'
        ? [searchParams['profs']]
        : searchParams['profs'];

  // const prof = await getProfReviewsCourses(9, 5);
  // const prof2 = await getProfReviewsCourses(1, 5);
  // const prof3 = await getProfReviewsCourses(2, 5);
  const promises = [];

  for (let i = 0; i < profParams.length; i++) {
    if (i >= 5) break;
    const profId = profParams[i];
    promises.push(getProfReviewsCourses(Number(profId), 5));
  }

  const profs = await Promise.all(promises);

  if (!profs || !profNames) redirect('/not-found');

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="space-between flex w-full flex-row items-center justify-between p-8">
        <span className="inline-flex items-center gap-2">
          <BackButton />
          <h1 className="text-3xl font-extrabold text-slate-100">Compare</h1>
        </span>
        <div className="flex flex-row items-center gap-4 align-middle text-xs text-slate-500">
          Only up to 5 professors allowed.
          <CmdkDialogBtn
            items={profNames.map((prof) => {
              return {
                label: `${toProperCase(prof.firstName)} ${toProperCase(prof.lastName)}`,
                value: `${prof.id}`,
              };
            })}
            disabled={profParams.length >= 5}
          >
            <span className="align-middle">
              Add Professor
              <kbd className="font-mono pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border border-slate-400 px-1.5 text-sm font-medium text-slate-400">
                Ctrl K
              </kbd>
            </span>
          </CmdkDialogBtn>
        </div>
      </div>

      <Separator />

      {profs.length ? (
        <div className="py-auto flex h-full flex-row items-start gap-4 overflow-scroll p-12">
          {profs.map((prof) => {
            if (prof === null) return null;
            return <CompareCard key={prof.id} prof={prof} />;
          })}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-slate-600">
          <BadgePlus size={128} strokeWidth={1} />
          Press Ctrl K to add professors and get started!
        </div>
      )}
    </div>
  );
}
