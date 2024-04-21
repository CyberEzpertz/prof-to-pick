import { Prisma } from '@prisma/client';

const profWithReviews = Prisma.validator<Prisma.ProfessorDefaultArgs>()({
  include: { reviews: true },
});

export type ProfWithReviews = Prisma.ProfessorGetPayload<
  typeof profWithReviews
>;
