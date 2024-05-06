'use client';

import { ReviewWithSubs, reviewFormSchema } from '@/lib/types';
import { cn } from '@/lib/utils';
import { createReview, updateReview } from '@/server-actions/reviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modality, Tag } from '@prisma/client';
import { CommandGroup } from 'cmdk';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import MultiSelectFormField from './ui/multibox';

type Props = {
  profId: number;
  courses: string[];
  children: ReactNode;
  review?: ReviewWithSubs;
};

const tagsEnum = Object.values(Tag);
const modalityEnum = Object.values(Modality);

const ReviewForm = ({ profId, courses, children, review }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    reValidateMode: 'onBlur',
    resolver: zodResolver(reviewFormSchema),
    ...(review
      ? {
          defaultValues: {
            rating: review.rating as number,
            comment: review.comment as string,
            courseCode: review.courseCode as string,
            difficulty: review.difficulty as number,
            modality: review.modality as Modality,
            tags: review.tags,
            subCourses: review.subReviews.map((review) => review.courseCode),
            professorId: review.professorId,
          },
        }
      : {
          defaultValues: {
            rating: 1,
            difficulty: 1,
            tags: [],
            modality: 'HYBRID',
            professorId: profId,
            subCourses: [],
          },
        }),
  });

  const handleSubmit = async (data: z.infer<typeof reviewFormSchema>) => {
    let success;
    console.log('Review: ' + !!review);
    if (review) {
      success = await updateReview(data, review.id);
    } else {
      success = await createReview(data);
    }

    setOpen(false);

    if (success === 'P2002') {
      toast({
        variant: 'destructive',
        description:
          'You already have a review for that subject. Only 1 review per subject per professor is allowed.',
      });
    } else if (success) {
      toast({
        description: 'Your review has been successfully submitted.',
      });
      form.reset();
    } else
      toast({
        variant: 'destructive',
        description: "Your review didn't get submitted. Please try again.",
      });
  };

  const [CoursesOpen, setCoursesOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="h-max max-h-[90%] w-max max-w-[80%] overflow-y-scroll lg:max-w-[50rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {review ? 'Editing' : 'Writing'} a Review
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 lg:grid lg:auto-rows-auto lg:grid-cols-2">
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
                        <Command className="border-slate-800/50">
                          <CommandInput placeholder="Search course..." />
                          <CommandEmpty>No course found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {courses.map((course) => (
                                <CommandItem
                                  value={course}
                                  key={course}
                                  onSelect={() => {
                                    const subCourses = form
                                      .getValues('subCourses')
                                      .filter((item) => item !== course);

                                    form.setValue('subCourses', subCourses);
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
                    <FormDescription className="text-balance">
                      What course did you take this professor?
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
                    <FormLabel>Modality</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={'HYBRID'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modalityEnum.map(
                          (modality) =>
                            modality !== 'TENTATIVE' && (
                              <SelectItem value={modality} key={modality}>
                                {modality.replaceAll('_', ' ')}
                              </SelectItem>
                            ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-balance">
                      What modality did you take this professor under?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subCourses"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Sub-courses</FormLabel>

                    <MultiSelectFormField
                      options={courses.reduce<
                        Record<'value' | 'label', string>[]
                      >((acc, course) => {
                        if (course !== form.getValues('courseCode'))
                          acc.push({
                            value: course,
                            label: course,
                          });
                        return acc;
                      }, [])}
                      defaultValue={field.value}
                      placeholder="Select Courses"
                      onValueChange={field.onChange}
                      className="h-8"
                    />
                    <FormDescription className="flex flex-col text-balance">
                      Select courses that you would like to include with this
                      review.{' '}
                      <span className="italic">
                        (If your rating for the course differs, please make a
                        separate review)
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      className="w-full resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please do not type anything that is derogatory in any way.
                    Doing so will result in an immediate ban.
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
                  <FormDescription>Select up to 5 tags only.</FormDescription>
                  <FormMessage />
                </FormItem>
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
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReviewForm;
