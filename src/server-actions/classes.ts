'use server';

import prisma from '@/db/prisma/prisma';
import { Class, classArraySchema } from '@/lib/types';
import { revalidateTag } from 'next/cache';

const insertData = async (curr: Class) => {
  let start, end;
  let profId: number | null = null;
  console.log(curr.professor);

  if (curr.professor) {
    let lastName = curr.professor.match(/.*(?=,)/)![0];
    let firstName = curr.professor.match(/((?<=,\s).+(?=\s\s)|(?<=,\s).+)/)![0];

    try {
      start = performance.now();

      const prof = await prisma.professor.upsert({
        where: {
          fullName: {
            firstName: firstName,
            lastName: lastName,
          },
        },
        create: {
          firstName: firstName,
          lastName: lastName,
          courses: {
            connect: {
              code: curr.course,
            },
          },
        },
        update: {
          courses: {
            connect: {
              code: curr.course,
            },
          },
        },
      });

      end = performance.now();
      console.log(`Professor upsert: ${(end - start).toFixed(2)} ms`);
      profId = prof.id;
    } catch (error) {
      console.error('Last Professor logged:');
      console.error(error);
    }
  }

  const newClass = await prisma.class.upsert({
    where: {
      code: curr.code,
    },
    create: {
      code: curr.code,
      course_code: curr.course,
      cap: curr.enrollCap,
      enrolled: curr.enrolled,
      restriction: curr.restriction,
      modality: curr.modality,
      rooms: curr.rooms,
      ...(profId && { professorId: profId }),
      section: curr.section,
      remarks: curr.remarks,
      schedules: {
        connectOrCreate: [
          ...curr.schedules.map((sched) => ({
            where: {
              scheduleParams: {
                day: sched.day,
                start: sched.start,
                end: sched.end,
                date: sched.date,
              },
            },
            create: {
              day: sched.day,
              start: sched.start,
              end: sched.end,
              date: sched.date,
            },
          })),
        ],
      },
    },
    update: {
      cap: curr.enrollCap,
      enrolled: curr.enrolled,
      restriction: curr.restriction,
      modality: curr.modality,
      remarks: curr.remarks,
      schedules: {
        connectOrCreate: [
          ...curr.schedules.map((sched) => ({
            where: {
              scheduleParams: {
                day: sched.day,
                start: sched.start,
                end: sched.end,
                date: sched.date,
              },
            },
            create: {
              day: sched.day,
              start: sched.start,
              end: sched.end,
              date: sched.date,
            },
          })),
        ],
      },
    },
  });
};

export const getClasses = async (idString: string, subject: string) => {
  const id = Number(idString);

  const res = await fetch(
    `${process.env.COURSE_API_URL}/api/getClasses/?id=${id}&subject=${subject}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  )
    .then((res) => res.json())
    .then(async (data) => {
      // validate the shape of the response
      const parsed = classArraySchema.safeParse(data);

      // if it's not the correct shape, return prematurely
      if (!parsed.success) {
        console.error(parsed.error);
        console.error('Unsuccesful parse.');
        return;
      }

      const classes = parsed.data;

      await prisma.course.upsert({
        where: {
          code: classes[0].course,
        },
        create: {
          code: classes[0].course,
        },
        update: {},
      });

      for (const curr of classes) {
        await insertData(curr);
      }

      revalidateTag('courses');
      revalidateTag('professors');
      return true;
    })
    .catch((error) => {
      console.error('Error fetching classes data.');
      console.error(error);
      return false;
    });

  return res;
};

export async function checkClasses() {
  try {
    const res = await fetch(`${process.env.COURSE_API_URL}/api/isReady`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (res.status === 200) return true;
    return false;
  } catch (error) {
    console.error('Site is not ready yet.');
    console.error(error);
    return false;
  }
}

export const generateSchedules = async () => {
  type classCodeSched = {
    code: number;
    schedules: {
      id: number;
      day: 'M' | 'T' | 'W' | 'H' | 'F' | 'S' | 'U';
      start: number;
      end: number;
    }[];
  };

  const courses = await prisma.course.findMany({
    where: {
      OR: [
        {
          code: 'CCAPDEV',
        },
        {
          code: 'CSSWENG',
        },
        {
          code: 'CCDSTRU',
        },
      ],
    },
    select: {
      code: true,
      classes: {
        select: {
          code: true,
          schedules: true,
        },
      },
    },
  });

  const generateCombination = (
    currCombination: classCodeSched[],
    usedScheds: number[],
    courseIndex: number,
  ): classCodeSched[][] => {
    if (courseIndex === courses.length) {
      return [[...currCombination]];
    }

    const generated: classCodeSched[][] = [];
    for (const classSched of courses[courseIndex].classes) {
      let overlap = false;
      // Check for overlapping schedules
      for (const sched of classSched.schedules) {
        if (usedScheds.includes(sched.id)) {
          overlap = true;
          break;
        }
      }

      if (overlap) continue;

      const subGenerations = generateCombination(
        [...currCombination, classSched],
        [...usedScheds, ...classSched.schedules.map((sched) => sched.id)],
        courseIndex + 1,
      );

      generated.push(...subGenerations);
    }

    return generated;
  };

  const generateIterativeCombination = () => {
    let memo: classCodeSched[][] = [[]];

    // Iterate throughout all of the courses here.
    for (const course of courses) {
      // We'll be storing the new combinations here for the current course.
      const newCombinations: classCodeSched[][] = [];

      // Iterate through all of currently generated schedules.
      for (const currCombo of memo) {
        // Iterate throughout all of the classes of the course
        let classExists = false;
        for (const courseClass of course.classes) {
          let overlap = false;

          // Here check for any overlap with the current combination's classes' schedules.
          for (const sched of courseClass.schedules) {
            if (
              currCombo.some((currClass) =>
                currClass.schedules.some(
                  (currSched) => currSched.id === sched.id,
                ),
              )
            ) {
              overlap = true;
              break;
            }
          }

          // If there is overlap, just skip over it.
          if (overlap) continue;

          classExists = true;
          // Make a new combination schedule using the schedule
          const newCombo = [...currCombo, courseClass];
          newCombinations.push(newCombo);
        }
        if (!classExists) return [];
      }

      // Reassign memo to the new combinations
      memo = newCombinations;
    }

    return memo;
  };

  const start = performance.now();
  // const generations = courses[0].classes.flatMap((courseClass) =>
  //   generateCombination(
  //     [courseClass],
  //     courseClass.schedules.map((sched) => sched.id),
  //     1,
  //   ),
  // );

  const generations = generateIterativeCombination();
  const end = performance.now();
  console.log((end - start).toFixed(4));

  return generations;
};
