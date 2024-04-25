import ReviewForm from '@/components/ReviewForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import prisma from '@/db/prisma/prisma';
import { Form } from 'react-hook-form';

async function getCourses(id: number) {
  const courses = await prisma.professor.findUnique({
    where: {
      id: id,
    },
    select: {
      courses: {
        select: {
          code: true,
        },
      },
    },
  });

  return courses?.courses.map((course) => course.code) ?? [];
}

export default async function Home() {
  const courses = await getCourses(1);
  return (
    <div className="flex- h-full w-full p-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-1/2 h-max w-1/2">
          <AlertDialogHeader>
            <AlertDialogTitle>Writing a Review</AlertDialogTitle>
            <AlertDialogDescription>
              {`You're now writing a review for`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ReviewForm courses={courses} profId={1} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
