import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateSchedules } from '@/server-actions/classes';
import Link from 'next/link';

export default async function Scheduler({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const schedules = await generateSchedules();
  const schedIndex = Number.isNaN(Number(searchParams['schedule']))
    ? 0
    : Number(searchParams['schedule']);
  const headerStyle =
    'relative h-full w-full text-center rounded-lg border-slate-700 py-2 px-2 mx-2 border';

  return (
    <div className="flex w-full flex-row">
      <div className="flex h-full max-w-[200px] flex-col">
        <div className="flex w-full flex-col gap-2 overflow-scroll">
          {schedules.map((_, index) => (
            <Link
              className={buttonVariants({ variant: 'outline' })}
              key={index}
              href={`/scheduler?schedule=${index}`}
            >
              Schedule {index}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto flex h-full min-h-0 w-5/6 flex-row">
        <div className="flex h-full w-full flex-col">
          <div className="flex w-full flex-row py-4">
            <div className="w-[50px] shrink-0"></div>
            <div className="w-2 shrink-0" />

            <div className={headerStyle}>Monday</div>
            <div className={headerStyle}>Tuesday</div>
            <div className={headerStyle}>Wednesday</div>
            <div className={headerStyle}>Thursday</div>
            <div className={headerStyle}>Friday</div>
            <div className={headerStyle}>Saturday</div>
          </div>
          <div className="flex h-max w-full overflow-auto">
            <div className="flex h-max w-full flex-row">
              <div className="flex h-max w-[50px] shrink-0 flex-col items-end">
                {[...Array(16)].map((_, index) => (
                  <div className={cn(`h-16 shrink-0`)} key={index}>
                    {' '}
                    <span className="relative top-[3px] w-7 text-nowrap pr-2 text-right text-sm text-slate-500">
                      {index + 7 > 12 ? index - 5 : index + 7}{' '}
                      {index + 7 >= 12 ? 'PM' : 'AM'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative flex w-full flex-row py-4">
                <div className="h-full w-0">
                  {[...Array(15)].map((_, index) => (
                    <div
                      className={cn(
                        `h-16 after:absolute after:z-10 after:h-[1px] after:w-full after:bg-slate-800 after:content-['']`,
                      )}
                      key={index}
                    />
                  ))}
                  <div
                    className={cn(
                      `h-0 after:absolute after:z-10 after:h-[1px] after:w-full after:bg-slate-800 after:content-['']`,
                    )}
                  />
                </div>
                <div className="h-full w-2 shrink-0" />
                <div className="flex h-full w-full flex-col border-r border-slate-800"></div>
                <div className="flex h-full w-full flex-col border-r border-slate-800"></div>
                <div className="flex h-full w-full flex-col border-r border-slate-800"></div>
                <div className="flex h-full w-full flex-col border-r border-slate-800"></div>
                <div className="flex h-full w-full flex-col border-r border-slate-800"></div>
                <div className="flex h-full w-full flex-col border-r border-slate-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
