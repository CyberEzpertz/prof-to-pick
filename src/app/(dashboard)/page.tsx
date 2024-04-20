'use client';
import ReviewCard from '@/components/ReviewCard';
import SiteNavbar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getTable } from '@/server-actions/test';
import { Review, User } from '@prisma/client';

const handleClick = async () => {
  await getTable()
    .then((table) => console.log(table))
    .catch((error) => console.log(error));
};

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

export default function Home() {
  return (
    <div className="flex w-full flex-row">
      <div className="flex flex-[7] flex-col gap-6 p-8">
        <div></div>
        <ReviewCard review={review}></ReviewCard>
        <ReviewCard review={review}></ReviewCard>
      </div>
      <Separator orientation="vertical" className="my-auto h-[95%]" />
      <div className="flex-[5]"></div>
    </div>
  );
}
