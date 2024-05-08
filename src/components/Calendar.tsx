'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { classCodeSched } from '@/server-actions/classes';

enum daysEnum {
  'M',
  'T',
  'W',
  'H',
  'F',
  'S',
}

const Calendar = ({ courses }: { courses: classCodeSched[] }) => {
  const [hovered, setHovered] = useState<number | false>(false);

  const cardColors = [
    'dark:border-amber-800',
    'dark:border-green-800',
    'dark:border-teal-800',
    'dark:border-indigo-800',
    'dark:border-sky-800',
    'dark:border-purple-800',
    'dark:border-rose-800',
    'dark:border-orange-800',
  ];

  const courseColors: Record<string, string> = {};

  const getRandomColor = () => {
    return cardColors.pop() as string;
  };

  const sortedClasses = courses.reduce<
    Record<keyof typeof daysEnum, (classCodeSched & { colorCode: string })[]>
  >(
    (acc, course) => {
      for (const sched of course.schedules) {
        if (!courseColors[course.code]) {
          const color = getRandomColor();
          courseColors[course.code] = color;
        }

        if (sched.day !== 'U') {
          acc[sched.day].push({
            code: course.code,
            schedules: [{ ...sched }],
            colorCode: courseColors[course.code],
          });
        }
      }

      return acc;
    },
    { M: [], T: [], W: [], H: [], F: [], S: [] },
  );

  console.log(sortedClasses);

  const calculateHeight = (start: number, end: number) => {
    const startHour = Math.floor(start / 100);
    const endHour = Math.floor(end / 100);
    const startMinutes = start % 100;
    const endMinutes = end % 100;

    const totalMinutes =
      (endHour - startHour) * 60 + (endMinutes - startMinutes);

    return (totalMinutes / 60) * 64;
  };

  const headerStyle =
    'relative h-full w-full text-center rounded-lg py-2 px-2 mx-2 font-bold';

  return (
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
        <div className="flex h-full w-full overflow-auto">
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
                      `h-16 after:absolute after:-z-10 after:h-[1px] after:w-full after:bg-slate-800 after:content-['']`,
                    )}
                    key={index}
                  />
                ))}
                <div
                  className={cn(
                    `h-0 after:absolute after:-z-10 after:h-[1px] after:w-full after:bg-slate-800 after:content-['']`,
                  )}
                />
              </div>
              <div className="h-full w-2 shrink-0" />
              {(Object.keys(sortedClasses) as Array<keyof typeof daysEnum>).map(
                (day) => {
                  return (
                    <div
                      className="relative flex h-full w-full flex-col border-l border-slate-800 pr-2"
                      key={day}
                    >
                      {sortedClasses[day].map((currClass, index) => {
                        const start = currClass.schedules[0].start;
                        const end = currClass.schedules[0].end;

                        return (
                          <Card
                            key={index}
                            onMouseEnter={() => setHovered(currClass.code)}
                            onMouseLeave={() => setHovered(false)}
                            className={cn(
                              `${hovered === currClass.code && 'scale-105'} absolute w-[95%] transition-all ${currClass.colorCode}`,
                            )}
                            style={{
                              height: calculateHeight(start, end),
                              top: calculateHeight(700, start),
                            }}
                          >
                            <CardTitle>{currClass.code}</CardTitle>
                            <span>
                              {start} - {end}
                            </span>
                          </Card>
                        );
                      })}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
