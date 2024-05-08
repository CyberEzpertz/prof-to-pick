import Calendar from '@/components/Calendar';
import { buttonVariants } from '@/components/ui/button';
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
      <Calendar courses={schedules[schedIndex]} />
    </div>
  );
}
