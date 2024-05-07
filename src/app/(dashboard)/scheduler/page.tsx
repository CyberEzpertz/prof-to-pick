import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
      <div className="flex h-full w-full flex-row items-center justify-center">
        {schedules[schedIndex].map((classSched) => (
          <Card key={classSched.code}>
            <CardHeader>{classSched.code}</CardHeader>
            <CardContent className="flex flex-col">
              {classSched.schedules.map((sched) => (
                <span key={sched.id}>
                  {sched.day} {sched.start} {sched.end}
                </span>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
