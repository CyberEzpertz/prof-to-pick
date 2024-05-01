'use client';
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { checkClasses, getClasses } from '@/server-actions/classes';
import { toast } from './ui/use-toast';
import nProgress from 'nprogress';

const formSchema = z.object({
  courseCode: z.string().length(7),
  idNumber: z.string().length(8),
});

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  nProgress.start();
  const success = await getClasses(values.idNumber, values.courseCode);
  nProgress.done();
  if (success) {
    toast({
      variant: 'default',
      title: `Fetched data for ${values.courseCode} successfully!`,
      description: `Classes for ${values.courseCode} are now available in the search tab.`,
    });
  } else {
    toast({
      variant: 'destructive',
      title: `Something went wrong...`,
      description: `Either ${values.courseCode} has no classes, or your ID number is wrong. Try again.`,
    });
  }
};

const checkSite = async () => {
  nProgress.start();
  const success = await checkClasses();
  nProgress.done();
  if (success) {
    toast({
      variant: 'default',
      title: `Site has spun up!`,
      description: `Site is ready to receive requests.`,
    });
  } else {
    toast({
      variant: 'destructive',
      title: `Site is not yet ready.`,
      description: `Give it a little bit more time.`,
    });
  }
};

const CourseSearch = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: '',
      idNumber: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Code</FormLabel>
              <FormControl>
                <Input placeholder="CSSWENG" {...field} />
              </FormControl>
              <FormDescription>
                This is the course that will be fetched.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input placeholder="12345678" {...field} />
              </FormControl>
              <FormDescription>This is your 8-digit ID Number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end gap-2">
          <Button type="button" onClick={checkSite} variant="secondary">
            Check
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseSearch;
