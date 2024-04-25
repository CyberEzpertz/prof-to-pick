'use client';

import { reviewFormSchema } from '@/lib/types';
import { cn } from '@/lib/utils';
import { createReview } from '@/server-actions/reviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modality, Tag } from '@prisma/client';
import { CommandGroup } from 'cmdk';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertDialogCancel, AlertDialogFooter } from './ui/alert-dialog';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

type Props = {
  profId: number;
  courses: string[];
};

const handleSubmit = async (data: z.infer<typeof reviewFormSchema>) => {
  console.log(data);
  await createReview(data);

  toast({
    title: 'You submitted the following values:',
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
};

const tagsEnum = Object.values(Tag);
const modalityEnum = Object.values(Modality);

const ReviewForm = ({ profId, courses }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 1,
      difficulty: 1,
      tags: [],
      modality: 'HYBRID',
      professorId: profId,
    },
    reValidateMode: 'onBlur',
  });

  const [CoursesOpen, setCoursesOpen] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex flex-row gap-12">
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
                          ? courses.find((course) => course === field.value)
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
                          {courses.map((course) => (
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
                <FormDescription>
                  This is the course that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modality"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Rating</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={'HYBRID'}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {modalityEnum.map((modality) => (
                      <SelectItem value={modality} key={modality}>
                        {modality.replaceAll('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  How was your overall experience with this professor?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-12">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 - Dreadful</SelectItem>
                    <SelectItem value="2">2 - Awful</SelectItem>
                    <SelectItem value="3">3 - Okay </SelectItem>
                    <SelectItem value="4">4 - Great</SelectItem>
                    <SelectItem value="5">5 - The Best</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How was your overall experience with this professor?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 - Very Easy</SelectItem>
                    <SelectItem value="2">2 - Easy</SelectItem>
                    <SelectItem value="3">3 - Average </SelectItem>
                    <SelectItem value="4">4 - Hard</SelectItem>
                    <SelectItem value="5">5 - Very Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How difficult did they make your class experience?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a few words about your experience with this prof."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please do not type anything that is derogatory in any way. Doing
                so will result in an immediate ban.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  className="flex flex-row flex-wrap justify-start"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  {tagsEnum.map((tag) => (
                    <ToggleGroupItem
                      key={tag}
                      value={tag}
                      aria-label="Toggle bold"
                      variant="outline"
                    >
                      {tag.replaceAll('_', ' ')}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormDescription>
                Please do not type anything that is derogatory in any way. Doing
                so will result in an immediate ban.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <Button type="submit">Submit</Button>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default ReviewForm;
