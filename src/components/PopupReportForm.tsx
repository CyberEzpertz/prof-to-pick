'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReactNode, useState } from 'react';
import ReportForm from './ReportForm';

type Props = {
  children: ReactNode;
  reviewId: number;
};

const PopupReportForm = ({ children, reviewId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Report a Review</AlertDialogTitle>
          <AlertDialogDescription>
            Make sure that your report is truthful. Too many false reports will
            result in a ban.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ReportForm reviewId={reviewId} setOpen={setOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupReportForm;
