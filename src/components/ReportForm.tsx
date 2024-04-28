'use client';

import { reportFormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField } from './ui/form';
import { ReportType } from '@prisma/client';
import FormSelect from './form/FormSelect';
import FormTextArea from './form/FormTextArea';
import { AlertDialogCancel, AlertDialogFooter } from './ui/alert-dialog';
import { Button } from './ui/button';
import { createReport } from '@/server-actions/reports';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

type Props = {
  reviewId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReportForm = ({ reviewId, setOpen }: Props) => {
  const form = useForm<z.infer<typeof reportFormSchema>>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reason: '',
      reportType: 'OFFENSIVE_CONTENT',
      reviewId: reviewId,
    },
    reValidateMode: 'onBlur',
  });

  const handleSubmit = async (data: z.infer<typeof reportFormSchema>) => {
    const success = await createReport(data);

    if (success) {
      toast({
        variant: 'default',
        title: 'Report successfully submitted!',
        description:
          'Thanks for that! We will take a look at your report soon.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'There was a problem in creating your report.',
        action: (
          <ToastAction altText="Try again" onClick={() => handleSubmit(data)}>
            Try again
          </ToastAction>
        ),
      });
    }

    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reportType"
          render={({ field }) => (
            <FormSelect
              defaultValue={`${field.value}`}
              onValueChange={field.onChange}
              removeUnderScore
              description="Pick the one that this review violates the most."
              label="Report Type"
              items={Object.values(ReportType)}
            />
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormTextArea
              field={field}
              label="Reason for reporting"
              description="This will help us validate your report more. (Optional)"
            />
          )}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default ReportForm;
