import { Day, Modality, Prisma, Restriction } from '@prisma/client';
import { z } from 'zod';

const profWithReviews = Prisma.validator<Prisma.ProfessorDefaultArgs>()({
  include: { reviews: true },
});

export type ProfWithReviews = Prisma.ProfessorGetPayload<
  typeof profWithReviews
>;

export const scheduleSchema = z.object({
  day: z.nativeEnum(Day),
  start: z.number(),
  end: z.number(),
  date: z.string(),
});

export const classSchema = z.object({
  code: z.number(),
  course: z.string(),
  section: z.string(),
  professor: z.nullable(z.string()),
  schedules: z.array(scheduleSchema),
  enrolled: z.number(),
  enrollCap: z.number(),
  rooms: z.array(z.string()),
  restriction: z.nativeEnum(Restriction),
  modality: z.nativeEnum(Modality),
  remarks: z.string(),
});

export const classArraySchema = z.array(classSchema);

export type Schedule = z.infer<typeof scheduleSchema>;
export type Class = z.infer<typeof classSchema>;
