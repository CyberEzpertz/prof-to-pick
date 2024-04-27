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
import { Button } from './ui/button';
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
        <Button variant="ghost" className="flex gap-2">
          <Trash />
          Delete
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
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleSubmit}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
