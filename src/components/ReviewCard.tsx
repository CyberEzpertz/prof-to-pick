import { Review } from '@prisma/client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Flame, LucideIcon, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import VoteButtons from './VoteButtons';

type ratingProps = {
  name: string;
  rating: number;
  icon: LucideIcon;
  hexColor: string;
  twColor: string;
};

const ReviewRating = (props: ratingProps) => {
  return (
    <div className="m-0 ml-8 flex w-min flex-row">
      <div
        className={cn(
          'mr-3 flex size-14 items-center justify-center rounded-lg font-display text-3xl',
          props.twColor,
        )}
      >
        {props.rating}
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-bold">{props.name}</span>
        <div className="flex flex-row">
          {[
            [...Array(5)].map((_, index) => (
              <props.icon
                key={index}
                fill={
                  Math.floor(props.rating) > index ? props.hexColor : '#94a3b8'
                }
                strokeWidth={0}
                size={18}
              />
            )),
          ]}
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
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
        <div className="ml-auto inline-flex">
          <ReviewRating
            hexColor="#2dd4bf"
            icon={Star}
            name="RATING"
            rating={review.rating}
            twColor="bg-teal-500"
          />
          <ReviewRating
            hexColor="#f43f5e"
            icon={Flame}
            name="DIFFICULTY"
            rating={review.difficulty}
            twColor="bg-rose-500"
          />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p>{review.comment}</p>
        <Separator className="my-4" />
        <div className="flex gap-4">
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
        <VoteButtons />
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
