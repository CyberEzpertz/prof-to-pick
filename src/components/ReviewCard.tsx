'use client';
import { Review, User, Vote } from '@prisma/client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Flame,
  LucideIcon,
  Star,
  ThumbsDown,
  ThumbsUp,
  TriangleAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import VoteButtons from './VoteButtons';
import DeleteButton from './DeleteButton';
import PopupReportForm from './PopupReportForm';
import { Button } from './ui/button';
import ReportForm from './ReportForm';
import ReviewRating from './ReviewRating';

type reviewProps = {
  review: Review;
  vote: Vote[];
  byCurrentUser?: boolean;
  isAdmin?: boolean;
};

const ReviewCard = ({
  review,
  vote,
  byCurrentUser,
  isAdmin = false,
}: reviewProps) => {
  return (
    <Card className="flex flex-col rounded-2xl border-0 p-2 dark:bg-slate-900 ">
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-3xl font-bold text-slate-200">
            {review.courseCode}
          </CardTitle>
          <CardDescription className="text-slate-400">
            ID{review.userIdNumber} • {review.modality} •{' '}
            {review.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </CardDescription>
        </div>
        <div className="ml-auto inline-flex gap-8">
          <ReviewRating name="RATING" rating={review.rating} />
          <ReviewRating
            name="DIFFICULTY"
            rating={review.difficulty}
            isDifficulty
          />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p>{review.comment}</p>
        <Separator className="my-4" />
        <div className="flex flex-wrap gap-2">
          {review.tags.map((tag, index) => {
            return (
              <Badge className="h-8 text-sm" variant="default" key={index}>
                {tag.replaceAll('_', ' ')}
              </Badge>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="justify-start text-slate-400">
        <div className=" mr-auto flex flex-row">
          <VoteButtons
            voteCount={review.voteCount}
            vote={vote[0] || undefined}
            reviewId={review.id}
          />
        </div>
        {
          <PopupReportForm reviewId={review.id}>
            <Button variant="ghost">
              <TriangleAlert className="mr-2" strokeWidth={1} />
              Report
            </Button>
          </PopupReportForm>
        }
        {(byCurrentUser || isAdmin) && <DeleteButton reviewId={review.id} />}
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
