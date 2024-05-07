'use client';
import { Form, FormField } from './ui/form';
import { toast } from './ui/use-toast';
import { inviteFormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createInvite } from '@/server-actions/users';
import { ToastAction } from './ui/toast';
import { Button } from './ui/button';
import FormInput from './form/FormInput';

const InviteForm = () => {
  const form = useForm<z.infer<typeof inviteFormSchema>>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: '',
    },
    reValidateMode: 'onBlur',
  });

  const handleSubmit = async (data: z.infer<typeof inviteFormSchema>) => {
    const response = await createInvite(data);

    if (response === 'P2002') {
      toast({
        variant: 'destructive',
        title: 'Cannot invite same email twice!',
        description: "You've already invited that email.",
      });
    } else if (response) {
      toast({
        variant: 'default',
        title: 'Invite successful!',
        description:
          "You can now let your friend know that they're now allowed to login using their DLSU email.",
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'There was a problem in creating your invite.',
        action: (
          <ToastAction altText="Try again" onClick={() => handleSubmit(data)}>
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormInput
              description="DLSU Email of the person you want to invite."
              field={field}
              label="Email"
              placeholder="juan_delacruz@dlsu.edu.ph"
            />
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="ml-auto"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default InviteForm;
