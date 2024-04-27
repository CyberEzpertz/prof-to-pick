'use server';

import prisma from '@/db/prisma/prisma';
import { Class, classArraySchema, classSchema } from '@/lib/types';
import { revalidateTag } from 'next/cache';

const insertData = async (curr: Class) => {
  let profId: number | null = null;

  console.log(curr.professor);
  if (curr.professor) {
    let lastName = curr.professor.match(/.*(?=,)/)![0];
    let firstName = curr.professor.match(/((?<=,\s).+(?=\s\s)|(?<=,\s).+)/)![0];

    console.log(firstName, lastName);
    try {
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
    },
    update: {
      cap: curr.enrollCap,
      enrolled: curr.enrolled,
      restriction: curr.restriction,
      modality: curr.modality,
      remarks: curr.remarks,
    },
  });

  for (const sched of curr.schedules) {
    await prisma.schedule.upsert({
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
        classes: {
          connect: {
            code: newClass.code,
          },
        },
      },
      update: {
        classes: {
          connect: {
            code: newClass.code,
          },
        },
      },
    });
  }
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
      console.log(data);

      // validate the shape of the response
      const parsed = classArraySchema.safeParse(data);

      // if it's not the correct shape, return prematurely
      if (!parsed.success) {
        console.error(parsed.error);
        // console.log('Unsuccesful parse.');
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
        console.log(curr);
        await insertData(curr);
      }
      revalidateTag('searchBar');
      return true;
    })
    .catch((error) => {
      console.log('Error fetching classes data.');
      console.error(error);
      return false;
    });

  return res;
};
