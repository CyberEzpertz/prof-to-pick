'use client';
import ProfessorInfo from '@/components/ProfessorInfo';
import ReviewCard from '@/components/ReviewCard';
import SiteNavbar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ProfWithReviews } from '@/lib/types';
import { Professor, Review, User } from '@prisma/client';

// const user: User = {
//   createdAt: new Date(),
//   email: 'bruh@dlsu.edu.ph',
//   firstName: 'bruh',
//   id: '122',
//   idNumber: 122,
//   lastName: 'BROOOOOOOO',
//   password: 'bahahaha',
//   role: 'ADMIN',
//   updatedAt: new Date(),
// };

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

const prof: ProfWithReviews = {
  firstName: 'DOMINIQUE ANGELA',
  lastName: 'JUNTADO',
  id: 123,
  tags: [
    'AMAZING_LECTURES',
    'CLEAR_INSTRUCTIONS',
    'CONSIDERATE',
    'EXTRA_CREDIT',
    'EXTRA_CREDIT',
  ],
  reviews: [],
};

export default function Home() {
  return (
    <div className="flex w-full flex-row">
      <ScrollArea className="flex-[7]">
        <div className="flex flex-[7] flex-col gap-6 p-8">
          <ReviewCard review={review}></ReviewCard>
          <ReviewCard review={review}></ReviewCard>
          <ReviewCard review={review}></ReviewCard>
        </div>
      </ScrollArea>
      <Separator orientation="vertical" className="my-auto h-[95%]" />
      <div className="flex flex-[4] flex-col justify-center gap-6 p-8">
        <ProfessorInfo prof={prof} />
      </div>
    </div>
  );
}
