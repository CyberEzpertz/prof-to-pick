'use server';

import prisma from '@/db/prisma/prisma';
import { Class, classArraySchema, classSchema } from '@/lib/types';

const insertData = async (curr: Class) => {
  let profId: number | null = null;

  if (curr.professor) {
    const firstName = curr.professor.match(/.*(?=,)/)![0];
    const lastName = curr.professor.match(/(?<=,\s).+(?=\s\s)/)![0];

    console.log(curr.professor, firstName, lastName);
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

  curr.schedules.forEach(async (sched) => {
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
  });
};

export const getClasses = async (id: number, subject: string) => {
  const res = await fetch(
    `http://${process.env.COURSE_API_URL}/api/getClasses/?id=${id}&subject=${subject}`,
    {
      method: 'GET',
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
        await insertData(curr);
      }
    });
};
