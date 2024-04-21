import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewCard from '@/components/ReviewCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import prisma from '@/db/prisma/prisma';
import { ProfWithReviews } from '@/lib/types';
import { Review, Professor } from '@prisma/client';
import React from 'react';

async function getProfessor(id: number) {
  const prof = await prisma.professor.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true,
    },
  });

  return prof as ProfWithReviews;
}

const review: Review = {
  id: 'test',
  comment: `My name is Skyler White, yo. My husband is Walter White, yo. Uh, huh. He told me everything. That's right. And just so you know... My brother-in-law is a DEA agent. And I will not hesitate to call him. Not if I have to. Understood? This is your one and only warning. Do not sell marijuana to my husband. I mean it. Don't call our house again. You stay away from him, or you'll be one sorry individual. You got me? You can dig it. Not that it's any of my business, but you might wanna consider a different line of work. Okay. `,
  courseCode: 'CCDSALG',
  createdAt: new Date(),
  difficulty: 4,
  modality: 'F2F',
  professorId: 123,
  rating: 4,
  tags: [
    'AMAZING_LECTURES',
    'CLEAR_INSTRUCTIONS',
    'CONSIDERATE',
    'EXTRA_CREDIT',
  ],
  updatedAt: new Date(),
  userId: 'hashahaha',
  userIdNumber: 122,
};

const page = async ({ params }: { params: { id: number } }) => {
  const prof = await getProfessor(Number(params.id));

  return (
    <div className="flex w-full flex-row">
      <ScrollArea className="flex-[7]">
        <div className="flex flex-[7] flex-col gap-6 p-8">
          {prof?.reviews.map((review, index) => (
            <ReviewCard review={review} key={index} />
          ))}
        </div>
      </ScrollArea>
      <Separator orientation="vertical" className="my-auto h-[95%]" />
      <div className="flex flex-[4] flex-col justify-center gap-6 p-8">
        <ProfessorInfo prof={prof} />
      </div>
    </div>
  );
};

export default page;
