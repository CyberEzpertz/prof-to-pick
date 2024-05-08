import {
  Day,
  Modality,
  Prisma,
  ReportType,
  Restriction,
  Tag,
} from '@prisma/client';
import { z } from 'zod';

const profWithReviews = Prisma.validator<Prisma.ProfessorDefaultArgs>()({
  include: {
    reviews: true,
  },
});

export type ProfWithReviews = Prisma.ProfessorGetPayload<
  typeof profWithReviews
>;

const reviewWithProfName = Prisma.validator<Prisma.ReviewDefaultArgs>()({
  include: {
    professor: {
      select: {
        firstName: true,
        lastName: true,
      },
    },
  },
});

export type ReviewWithProfName = Prisma.ReviewGetPayload<
  typeof reviewWithProfName
>;

const profWithReviewsCourses = Prisma.validator<Prisma.ProfessorDefaultArgs>()({
  include: {
    _count: {
      select: {
        reviews: true,
      },
    },
    reviews: {
      include: {
        subReviews: {
          select: {
            courseCode: true,
          },
        },
      },
    },
    courses: {
      select: {
        code: true,
      },
    },
  },
});

const reviewWithSubs = Prisma.validator<Prisma.ReviewDefaultArgs>()({
  include: {
    subReviews: {
      where: {
        NOT: { mainReviewId: null },
      },
      select: {
        courseCode: true,
      },
    },
  },
});

export type ProfWithReviewsCourses = Prisma.ProfessorGetPayload<
  typeof profWithReviewsCourses
>;

export type ReviewWithSubs = Prisma.ReviewGetPayload<typeof reviewWithSubs>;

const profWithReviewCount = Prisma.validator<Prisma.ProfessorDefaultArgs>()({
  include: {
    _count: {
      select: {
        reviews: true,
      },
    },
  },
});

export type ProfWithReviewCount = Prisma.ProfessorGetPayload<
  typeof profWithReviewCount
>;

const reviewWithVotes = Prisma.validator<Prisma.ReviewDefaultArgs>()({
  include: {
    votes: true,
    subReviews: {
      select: {
        courseCode: true,
      },
    },
  },
});
export type ReviewWithVotes = Prisma.ReviewGetPayload<typeof reviewWithVotes>;

const calendarCourse = Prisma.validator<Prisma.ClassDefaultArgs>()({
  select: {
    code: true,
    schedules: true,
    professor: {
      select: {
        firstName: true,
        lastName: true,
      },
    },
  },
});

export type CalendarCourse = Prisma.ClassGetPayload<typeof calendarCourse>;

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
  comment: z.string().trim().min(10).max(700),
  modality: z.nativeEnum(Modality),
  professorId: z.number(),
  courseCode: z.string({
    required_error: 'Please select a course.',
  }),
  subCourses: z
    .array(z.string())
    .max(4, 'Only up to 4 sub-courses can be selected.'),
});

export const reportFormSchema = z.object({
  reportType: z.nativeEnum(ReportType),
  reviewId: z.number(),
  reason: z.string().max(300).nullable(),
});

export const inviteFormSchema = z.object({
  email: z
    .string()
    .endsWith('@dlsu.edu.ph', 'Only DLSU students are allowed to be invited.'),
});

export const classArraySchema = z.array(classSchema);

export type Schedule = z.infer<typeof scheduleSchema>;
export type Class = z.infer<typeof classSchema>;
