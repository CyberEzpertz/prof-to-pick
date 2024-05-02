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

// export async function insertScheds() {
//   const times = [
//     {
//       start: 730,
//       end: 900,
//     },
//     {
//       start: 915,
//       end: 1045,
//     },
//     {
//       start: 1100,
//       end: 1230,
//     },
//     {
//       start: 1245,
//       end: 1415,
//     },
//     {
//       start: 1430,
//       end: 1600,
//     },
//     {
//       start: 1615,
//       end: 1745,
//     },
//     {
//       start: 1800,
//       end: 1930,
//     },
//     {
//       start: 800,
//       end: 1000,
//     },
//     {
//       start: 1000,
//       end: 1200,
//     },
//     {
//       start: 1300,
//       end: 1500,
//     },
//     {
//       start: 1530,
//       end: 1730,
//     },
//     {
//       start: 1800,
//       end: 2000,
//     },
//   ];

//   const days = ['M', 'T', 'W', 'H', 'F', 'S'] as const;

//   let schedules = <
//     {
//       start: number;
//       end: number;
//       day: 'M' | 'T' | 'W' | 'H' | 'F' | 'S';
//       date: string;
//     }[]
//   >[];

//   for (const time of times) {
//     for (const day of days) {
//       const newSched = {
//         ...time,
//         day: day,
//         date: '',
//       };
//       schedules.push(newSched);
//     }
//   }

//   const res = await prisma.schedule.createMany({
//     data: schedules,
//     skipDuplicates: true,
//   });
// }
