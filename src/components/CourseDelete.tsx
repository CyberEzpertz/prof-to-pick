'use client';
import React, { useState } from 'react';
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
import { toast } from './ui/use-toast';
import nProgress from 'nprogress';
import { Course } from '@prisma/client';
import { deleteCourse } from '@/server-actions/courses';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '@/lib/utils';
import { deleteProfsWithNoCourses } from '@/server-actions/professors';

const formSchema = z.object({
  courseCode: z.string().length(7),
});

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  nProgress.start();
  const success = await deleteCourse(values.courseCode);
  nProgress.done();
  if (success) {
    toast({
      variant: 'default',
      title: `Deleted data for ${values.courseCode} successfully!`,
      description: `Classes for ${values.courseCode} have been deleted.`,
    });
  } else {
    toast({
      variant: 'destructive',
      title: `Something went wrong...`,
      description: `Either ${values.courseCode} doesn't exist, or something else went wrong.`,
    });
  }

  const success2 = await deleteProfsWithNoCourses();
  if (success2) {
    toast({
      variant: 'default',
      title: `Deleted professors for ${values.courseCode} successfully!`,
      description: `Professors for ${values.courseCode} ONLY have been deleted.`,
    });
  } else {
    toast({
      variant: 'destructive',
      title: `Something went wrong...`,
      description: `No professors were deleted.`,
    });
  }
};

const CourseDelete = ({ courses }: { courses: Course[] }) => {
  const courseNames = courses.map((course) => course.code);
  const [CoursesOpen, setCoursesOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Course</FormLabel>
              <Popover open={CoursesOpen} onOpenChange={setCoursesOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? courseNames.find((course) => course === field.value)
                        : 'Select Course...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search course..." />
                    <CommandEmpty>No course found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {courseNames.map((course) => (
                          <CommandItem
                            value={course}
                            key={course}
                            onSelect={() => {
                              form.setValue('courseCode', course);
                              form.clearErrors('courseCode');
                              setCoursesOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                course === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {course}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>This course will be deleted.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="destructive">
          Delete
        </Button>
      </form>
    </Form>
  );
};

export default CourseDelete;
