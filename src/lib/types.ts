import {
  Day,
  Modality,
  Prisma,
  ReportType,
  Restriction,
  Tag,
} from '@prisma/client';
import { z } from 'zod';

const profWithReviewsAndCourses =
  Prisma.validator<Prisma.ProfessorDefaultArgs>()({
    include: {
      reviews: true,
      courses: {
        select: {
          code: true,
        },
      },
    },
  });

export type ProfWithReviewsAndCourses = Prisma.ProfessorGetPayload<
  typeof profWithReviewsAndCourses
>;

const reviewsWithVotes = Prisma.validator<Prisma.ReviewDefaultArgs>()({
  include: {
    votes: true,
  },
});
export type ReviewsWithVotes = Prisma.ReviewGetPayload<typeof reviewsWithVotes>;

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

export const reviewFormSchema = z.object({
  tags: z.array(z.nativeEnum(Tag)).max(5, 'Only up to 5 tags can be selected.'),
  rating: z.coerce.number().min(1).max(5),
  difficulty: z.coerce.number().min(1).max(5),
  comment: z.string().trim().min(10).max(300),
  modality: z.nativeEnum(Modality),
  professorId: z.number(),
  courseCode: z.string({
    required_error: 'Please select a course.',
  }),
});

export const reportFormSchema = z.object({
  reportType: z.nativeEnum(ReportType),
  reviewId: z.number(),
  reason: z.string().max(300).nullable(),
});

export const classArraySchema = z.array(classSchema);

export type Schedule = z.infer<typeof scheduleSchema>;
export type Class = z.infer<typeof classSchema>;
