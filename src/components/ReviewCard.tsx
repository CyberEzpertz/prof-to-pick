'use client';
import { Vote } from '@prisma/client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ChevronRight, Edit, TriangleAlert } from 'lucide-react';
import { Badge } from './ui/badge';
import VoteButtons from './VoteButtons';
import DeleteButton from './DeleteButton';
import PopupReportForm from './PopupReportForm';
import { Button, buttonVariants } from './ui/button';
import ReviewRating from './ReviewRating';
import { useMediaQuery } from 'usehooks-ts';
import Link from 'next/link';
import { cn, toProperCase } from '@/lib/utils';
import { ReviewWithProfName, ReviewWithSubs } from '@/lib/types';
import AvgRating from './AvgRating';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from './ui/popover';
import { TooltipContainer } from './ui/tooltip';
import ReviewForm from './ReviewForm';

type reviewProps = {
  review: ReviewWithSubs;
  vote: Vote[];
  byCurrentUser: boolean;
  isAdmin?: boolean;
  courses: string[];
};

const ReviewCardPreview = ({ review }: { review: ReviewWithProfName }) => {
  const isPhone = useMediaQuery('(max-width: 1024px)');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="max-h-76 flex w-full select-none flex-col text-left">
      <CardHeader className="flex flex-col flex-wrap justify-between gap-y-4 space-y-0 p-4 pb-0 lg:flex-row lg:p-6 lg:pb-6">
        <div className="flex w-full flex-row flex-wrap items-center justify-between gap-x-5 text-nowrap">
          <CardTitle className="text-lg font-bold text-slate-200 lg:text-3xl">
            {review.courseCode}
          </CardTitle>
          <CardDescription className="text-xs text-slate-400 lg:text-sm">
            ID{review.userIdNumber} • {review.modality} •{' '}
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </CardDescription>
        </div>
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-2">
          <ReviewRating
            name="RATING"
            rating={review.rating}
            variation={isPhone && isMounted ? 'noStar' : 'default'}
          />
          <ReviewRating
            name="DIFFICULTY"
            rating={review.difficulty}
            isDifficulty
            variation={isPhone && isMounted ? 'noStar' : 'default'}
          />
        </div>
      </CardHeader>
      <CardContent className="flex h-full min-h-0 flex-col p-4 pt-2 lg:p-6 lg:pb-4 lg:pt-0">
        <p className="line-clamp-3 w-full lg:max-h-16 lg:select-none lg:overflow-hidden lg:text-ellipsis lg:text-wrap lg:text-justify lg:text-sm">
          {review.comment}
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 lg:flex-row lg:items-end lg:justify-start">
          <p className="mr-auto justify-self-start text-xs italic text-slate-500 lg:self-center lg:text-sm">
            {`${toProperCase(review.professor.lastName)}, 
              ${toProperCase(review.professor.firstName)}`}
          </p>
          <Link
            href={`/professor/${review.professorId}`}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Check this Review <ChevronRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewCardCompare = ({ review }: { review: ReviewWithSubs }) => {
  const isPhone = useMediaQuery('(max-width: 1024px)');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="flex h-max w-full select-none flex-col text-left">
      <CardHeader className="flex flex-col gap-y-4 space-y-0 p-4 pb-0 lg:p-6">
        <div className="flex flex-row gap-1">
          <CardTitle className="flex w-full justify-between text-xs font-normal text-slate-400 lg:text-sm">
            <span className="font-bold text-slate-50">{review.courseCode}</span>
            <span>
              ID{review.userIdNumber} • {review.modality} •{' '}
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </CardTitle>
        </div>
        <div className="flex flex-col gap-x-8 gap-y-2 lg:flex-row">
          <AvgRating
            variant="xs"
            title="RATING"
            rating={review.rating}
            noIcon
          />
          <AvgRating
            variant="xs"
            title="DIFFICULTY"
            rating={review.difficulty}
            isDifficulty
            noIcon
          />
        </div>
      </CardHeader>
      <CardContent className="flex h-full min-h-0 flex-col p-4 pt-2 lg:p-6 lg:pt-0">
        <p className="lg:w-full lg:select-none lg:text-ellipsis lg:text-wrap lg:text-justify lg:text-sm">
          {review.comment}
        </p>
      </CardContent>
    </Card>
  );
};

const ReviewCard = ({
  review,
  vote,
  byCurrentUser,
  isAdmin = false,
  courses,
}: reviewProps) => {
  const isPhone = useMediaQuery('(max-width: 1024px)');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="max-w-30 flex shrink flex-col rounded-2xl border-0 p-2 dark:bg-slate-900">
      <CardHeader className="flex flex-col gap-y-4 space-y-0 xl:flex-row">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex flex-row items-center gap-2 text-lg font-bold text-slate-200 lg:text-3xl">
            {review.courseCode}
            {review.subReviews.length !== 0 && (
              <Popover>
                <TooltipContainer
                  content={
                    <span className="font-normal">Show Sub-Courses</span>
                  }
                  delayDuration={300}
                  side="right"
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="size-8 p-1 dark:bg-slate-900"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </PopoverTrigger>
                </TooltipContainer>
                <PopoverContent
                  className="flex w-32 flex-col items-center justify-center gap-2"
                  side="right"
                >
                  <span className="mb-1 text-xs font-bold">SUB-COURSES</span>
                  {review.subReviews.map((course) => (
                    <Badge
                      key={`${review.id}${course.courseCode}`}
                      className="flex w-full items-center justify-center p-1 dark:text-slate-400"
                      variant="secondary"
                    >
                      {course.courseCode}
                    </Badge>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          </CardTitle>
          <CardDescription className="text-nowrap text-xs text-slate-400 lg:text-sm">
            ID{review.userIdNumber} • {review.modality} •{' '}
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </CardDescription>
        </div>
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-4 xl:ml-auto">
          <ReviewRating name="RATING" rating={review.rating} />
          <ReviewRating
            name="DIFFICULTY"
            rating={review.difficulty}
            isDifficulty
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pb-4">
        <p className="text-justify text-[15px]">{review.comment}</p>
        {review.tags.length !== 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {review.tags.map((tag, index) => {
              return (
                <Badge
                  className="h-6 text-xs lg:h-8 lg:text-sm"
                  variant="default"
                  key={index}
                >
                  {tag.replaceAll('_', ' ')}
                </Badge>
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="w-full pt-2 text-slate-400">
        <div className="flex w-full flex-row items-center justify-between gap-2 rounded-xl p-2 px-4 dark:bg-slate-950/40">
          <div className="flex flex-row items-center px-2 py-2 lg:mr-auto">
            <VoteButtons
              voteCount={review.voteCount}
              vote={vote[0] || undefined}
              reviewId={review.id}
              isPhone={isPhone && isMounted}
            />
          </div>
          <div className="flex flex-row">
            {!byCurrentUser && (
              <PopupReportForm reviewId={review.id}>
                <Button variant="ghost">
                  <TriangleAlert
                    className="xl:mr-2"
                    strokeWidth={2}
                    size={20}
                  />
                  <span className="hidden xl:block">Report</span>
                </Button>
              </PopupReportForm>
            )}
            {byCurrentUser && (
              <ReviewForm
                courses={courses}
                profId={review.professorId}
                review={review}
              >
                <Button variant="ghost">
                  <Edit strokeWidth={2} size={20} className="xl:mr-2" />
                  <span className="hidden xl:block">Edit</span>
                </Button>
              </ReviewForm>
            )}
            {(byCurrentUser || isAdmin) && (
              <>
                <DeleteButton reviewId={review.id} />
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export { ReviewCard, ReviewCardPreview, ReviewCardCompare };
