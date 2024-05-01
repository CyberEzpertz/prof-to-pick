'use client';
import { Review, Vote } from '@prisma/client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ChevronRight, TriangleAlert } from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import VoteButtons from './VoteButtons';
import DeleteButton from './DeleteButton';
import PopupReportForm from './PopupReportForm';
import { Button, buttonVariants } from './ui/button';
import ReviewRating from './ReviewRating';
import { useMediaQuery } from 'usehooks-ts';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type reviewProps = {
  review: Review;
  vote: Vote[];
  byCurrentUser?: boolean;
  isAdmin?: boolean;
};

const ReviewCardPreview = ({ review }: { review: Review }) => {
  const isPhone = useMediaQuery('(max-width: 1024px)');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="flex h-60 w-full select-none flex-col text-left">
      <CardHeader className="flex flex-col gap-y-4 space-y-0 lg:flex-row">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-bold text-slate-200 lg:text-3xl">
            {review.courseCode}
          </CardTitle>
          <CardDescription className="text-sm text-slate-400">
            ID{review.userIdNumber} • {review.modality} •{' '}
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </CardDescription>
        </div>
        <div className="flex flex-col gap-x-8 gap-y-4 lg:ml-auto lg:flex-row">
          <ReviewRating name="RATING" rating={review.rating} />
          <ReviewRating
            name="DIFFICULTY"
            rating={review.difficulty}
            isDifficulty
          />
        </div>
      </CardHeader>
      <CardContent className="flex h-full min-h-0 flex-col pb-4">
        <p className="line-clamp-3 max-h-16 w-full select-none overflow-hidden text-ellipsis text-wrap text-justify text-xs lg:text-sm">
          {review.comment}
        </p>
        <div className="mt-auto flex items-end justify-end gap-2">
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

const ReviewCard = ({
  review,
  vote,
  byCurrentUser,
  isAdmin = false,
}: reviewProps) => {
  const isPhone = useMediaQuery('(max-width: 1024px)');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="flex flex-col rounded-2xl border-0 p-2 dark:bg-slate-900 ">
      <CardHeader className="flex flex-col gap-y-4 space-y-0 lg:flex-row">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-bold text-slate-200 lg:text-3xl">
            {review.courseCode}
          </CardTitle>
          <CardDescription className="text-sm text-slate-400">
            ID{review.userIdNumber} • {review.modality} •{' '}
            {review.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </CardDescription>
        </div>
        <div className="flex flex-col gap-x-8 gap-y-4 lg:ml-auto lg:flex-row">
          <ReviewRating name="RATING" rating={review.rating} />
          <ReviewRating
            name="DIFFICULTY"
            rating={review.difficulty}
            isDifficulty
          />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm lg:text-base">{review.comment}</p>
        <Separator className="my-4" />
        <div className="flex flex-wrap gap-2">
          {review.tags.map((tag, index) => {
            return (
              <Badge
                className="h-6 text-xs lg:h-8 lg:text-sm "
                variant="default"
                key={index}
              >
                {tag.replaceAll('_', ' ')}
              </Badge>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row flex-wrap justify-center gap-2 pt-2 text-slate-400 lg:justify-start">
        <div className="flex flex-row items-center lg:mr-auto">
          <VoteButtons
            voteCount={review.voteCount}
            vote={vote[0] || undefined}
            reviewId={review.id}
            isPhone={isPhone && isMounted}
          />
        </div>
        <div className="flex flex-row">
          {
            <PopupReportForm reviewId={review.id}>
              <Button variant="ghost">
                <TriangleAlert className="lg:mr-2" strokeWidth={1} />
                {!isPhone && isMounted && 'Report'}
              </Button>
            </PopupReportForm>
          }
          {(byCurrentUser || isAdmin) && (
            <DeleteButton reviewId={review.id} isPhone={isPhone && isMounted} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export { ReviewCard, ReviewCardPreview };
