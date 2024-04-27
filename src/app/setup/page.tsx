'use client';
import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import SetupForm from '@/components/SetupForm';

const Setup = () => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent
          className="w-96"
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Account Setup</AlertDialogTitle>
            <AlertDialogDescription>
              Please select your ID Number below. This will be used for your
              reviews.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <SetupForm setOpen={setOpen} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Setup;
