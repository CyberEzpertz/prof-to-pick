'use client';

import React from 'react';
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
import { Button, buttonVariants } from './ui/button';
import { Trash } from 'lucide-react';
import { toast } from './ui/use-toast';
import { deleteReview } from '@/server-actions/reviews';

const DeleteButton = ({ reviewId }: { reviewId: number }) => {
  const handleSubmit = async () => {
    const success = await deleteReview(reviewId);

    if (success) {
      toast({
        description: 'Successfully removed post.',
      });
    } else {
      toast({
        description: 'Something went wrong in deleting your post.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash className="xl:mr-2" strokeWidth={2} size={20} />
          <span className="hidden xl:block">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove your review from our database permanently. There is
            no undo button.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className={buttonVariants({ variant: 'destructive' })}
          >
            <Button onClick={handleSubmit}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
