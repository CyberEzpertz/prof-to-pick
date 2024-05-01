'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialogFooter,
} from './ui/alert-dialog';
import { updateUserId } from '@/server-actions/users';
import nProgress from 'nprogress';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';

const isTerm1 = new Date().getMonth() >= 9;

const latestId =
  Number(new Date().getFullYear().toString().slice(2)) + 99 + +isTerm1;

const formSchema = z.object({
  idNumber: z.coerce
    .number()
    .min(latestId - 8)
    .max(latestId),
});

const SetupForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setOpen(false);
    nProgress.start();
    await updateUserId(data);
    router.push('/');
    toast({
      title: 'Setup Successful!',
      description: `Your ID Number has been set to ${data.idNumber}. Thanks!`,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNumber: latestId,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'ID Number:'}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...Array(9)].map((_, index) => (
                    <SelectItem
                      key={latestId - index}
                      value={`${latestId - index}`}
                    >
                      {`ID${latestId - index}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Make sure that this is your ID Number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <Button type="submit">Submit</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default SetupForm;
