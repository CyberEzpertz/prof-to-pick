'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCourse } from '@/lib/types';
import { cn, convertTime } from '@/lib/utils';
import { useState } from 'react';

enum daysEnum {
  'M',
  'T',
  'W',
  'H',
  'F',
  'S',
}

const CELL_SIZE_PX = 56;
const CELL_HEIGHT = 'h-14';

const Calendar = ({ courses }: { courses: CalendarCourse[] }) => {
  const [hovered, setHovered] = useState<number | false>(false);
  const cardColors = [
    'dark:bg-amber-900',
    'dark:bg-green-900',
    'dark:bg-teal-900',
    'dark:bg-indigo-900',
    'dark:bg-sky-900',
    'dark:bg-purple-900',
    'dark:bg-rose-900',
  ];

  const cardShadows = [
    'dark:shadow-amber-700/50',
    'dark:shadow-green-700/50',
    'dark:shadow-teal-700/50',
    'dark:shadow-indigo-700/50',
    'dark:shadow-sky-700/50',
    'dark:shadow-purple-700/50',
    'dark:shadow-rose-700/50',
  ];

  const getRandomColor = () => {
    return {
      color: cardColors.pop() as string,
      shadow: cardShadows.pop() as string,
    };
  };

  const courseColors: Record<string, Record<'shadow' | 'color', string>> = {};

  const sortedClasses = courses.reduce<
    Record<
      keyof typeof daysEnum,
      (CalendarCourse & { color: string; shadow: string })[]
    >
  >(
    (acc, course) => {
      for (const sched of course.schedules) {
        if (!courseColors[course.code]) {
          const { color, shadow } = getRandomColor();
          courseColors[course.code] = { color, shadow };
        }

        if (sched.day !== 'U') {
          acc[sched.day].push({
            code: course.code,
            schedules: [{ ...sched }],
            professor: course.professor,
            color: courseColors[course.code].color,
            shadow: courseColors[course.code].shadow,
          });
        }
      }

      return acc;
    },
    { M: [], T: [], W: [], H: [], F: [], S: [] },
  );

  const calculateHeight = (start: number, end: number) => {
    const startHour = Math.floor(start / 100);
    const endHour = Math.floor(end / 100);
    const startMinutes = start % 100;
    const endMinutes = end % 100;

    const totalMinutes =
      (endHour - startHour) * 60 + (endMinutes - startMinutes);

    // 16 here is to account for offset
    return (totalMinutes / 60) * CELL_SIZE_PX;
  };

  const headerStyle =
    'relative h-full w-full text-center rounded-lg py-2 px-2 mx-2 font-bold';

  return (
    <div className="m-auto flex h-full min-h-0 w-5/6 flex-row">
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full flex-row border-b border-slate-800 py-4">
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
                <div className={cn(`${CELL_HEIGHT} shrink-0`)} key={index}>
                  {' '}
                  <span className="relative top-[3px] w-7 text-nowrap pr-2 text-right text-sm text-slate-500">
                    {index + 7 > 12 ? index - 5 : index + 7}{' '}
                    {index + 7 >= 12 ? 'PM' : 'AM'}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative flex w-full flex-row pb-4">
              <div className="h-full w-0 pt-4">
                {[...Array(15)].map((_, index) => (
                  <div
                    className={cn(
                      `${CELL_HEIGHT} after:absolute after:-z-10 after:h-[1px] after:w-full after:bg-slate-800 after:content-['']`,
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
                              `border-0 p-4 ${hovered === currClass.code && `scale-105 shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] ${currClass.shadow}`} absolute w-[95%] transition-all ${currClass.color}`,
                            )}
                            style={{
                              height: calculateHeight(start, end),
                              top: calculateHeight(700, start) + 16,
                            }}
                          >
                            <CardTitle>{currClass.code}</CardTitle>
                            <span>
                              {convertTime(start)} - {convertTime(end)}
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
