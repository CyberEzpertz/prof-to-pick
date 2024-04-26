import { cn } from '@/lib/utils';
import { Professor, Review } from '@prisma/client';
import React from 'react';
import { Separator } from './ui/separator';
import { Flame, LucideIcon, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ProfWithReviewsAndCourses } from '@/lib/types';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

const getTier = (rating: number, amount: number) => {
  let tier, tierColor;

  if (amount == 0) {
    return { tier: '?', tierColor: 'bg-slate-500' };
  }
  if (rating >= 3.33) {
    tier = 'W';
    tierColor = 'bg-teal-500';
  } else if (rating >= 1.67) {
    tier = 'M';
    tierColor = 'bg-purple-500';
  } else {
    tier = 'L';
    tierColor = 'bg-rose-500';
  }

  return { tier, tierColor };
};

type Props = {
  prof: ProfWithReviewsAndCourses;
};

type ratingProps = {
  name: string;
  rating: number;
  icon: LucideIcon;
  hexColor: string;
  twColor: string;
};

const AverageRating = (props: ratingProps) => {
  return (
    <div className="flex w-min flex-row">
      <div
        className={cn(
          'mr-3 flex size-16 items-center justify-center rounded-lg font-display text-4xl',
          props.twColor,
        )}
      >
        {props.rating}
      </div>
      <div className="flex flex-col justify-center">
        <span className="whitespace-nowrap font-bold">{props.name}</span>
        <div className="flex flex-row">
          {[
            [...Array(5)].map((_, index) => (
              <props.icon
                key={index}
                fill={
                  Math.ceil(props.rating) > index ? props.hexColor : '#94a3b8'
                }
                fillOpacity={
                  Math.floor(props.rating) > index
                    ? 1
                    : Math.ceil(props.rating) > index
                      ? 0.2 + Number((props.rating % 1).toFixed(2))
                      : 1
                }
                strokeWidth={0}
                size={26}
              />
            )),
          ]}
        </div>
      </div>
    </div>
  );
};

const RatingProgress = ({
  rating,
  progress,
  reviews,
}: {
  rating: number;
  progress: number;
  reviews: number;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="-mr-1 flex w-4 flex-row items-center gap-1 text-center">
        {rating}
      </div>
      <Star size={16} strokeWidth={0} fill="#94a3b8" />
      <Progress value={progress} color="dark:bg-teal-500" className="mx-2" />
      <span className="font-bold">{reviews}</span>
    </div>
  );
};

const getAggregates = (reviews: Review[], numReviews: number) => {
  const agg = reviews.reduce(
    (acc, review) => {
      acc.rating += review.rating;
      acc.diff += review.difficulty;
      acc.count[review.rating - 1] += 1;
      return acc;
    },
    { rating: 0, diff: 0, count: [0, 0, 0, 0, 0] },
  );

  agg.rating /= numReviews;
  agg.diff /= numReviews;
  agg.rating = Number(agg.rating.toFixed(1));
  agg.diff = Number(agg.diff.toFixed(1));

  return agg;
};

const ProfessorInfo = ({ prof }: Props) => {
  const numReviews = prof.reviews.length;
  const agg = getAggregates(prof.reviews, numReviews);

  const { tier, tierColor } = getTier(agg.rating, numReviews);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div
          className={cn(
            'mr-6 flex size-20 items-center justify-center rounded-lg font-display text-6xl',
            tierColor,
          )}
        >
          {tier}
        </div>
        <div className="flex flex-col gap-1 text-4xl font-extrabold">
          <span>{prof.lastName},</span>
          <span>{prof.firstName}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-slate-400">
            Based on {numReviews} reviews
          </span>
          <div className="flex flex-row gap-20">
            <AverageRating
              hexColor="#2dd4bf"
              icon={Star}
              name="AVG. RATING"
              rating={agg.rating || 0}
              twColor="bg-teal-500"
            />
            <AverageRating
              hexColor="#f43f5e"
              icon={Flame}
              name="AVG. DIFFICULTY"
              rating={agg.diff || 0}
              twColor="bg-rose-500"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="mb-2 font-medium text-slate-400">
            Most used tags
          </span>
          <Card>
            <CardContent className="flex flex-row flex-wrap gap-2 p-3">
              {prof.tags.length ? (
                prof.tags.map((tag, index) => {
                  return (
                    <Badge
                      className="h-8 whitespace-nowrap text-sm"
                      variant="default"
                      key={index}
                    >
                      {tag.replaceAll('_', ' ')}
                    </Badge>
                  );
                })
              ) : (
                <p className="text-sm italic text-slate-400">
                  No tags for this prof. yet...
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-slate-400">
            Verifiably teaches these courses
          </span>
          <Card>
            <CardContent className="flex flex-row flex-wrap gap-2 p-3">
              {prof.courses.map((tag, index) => {
                return (
                  <Link
                    href={`/courses/${tag.code}`}
                    className={buttonVariants({ variant: 'outline' })}
                    key={tag.code}
                  >
                    {tag.code}
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-slate-400">
            Rating Distribution
          </span>
          <Card className="flex flex-col gap-2 p-4">
            {[...Array(5)].map((_, index) => (
              <RatingProgress
                progress={(agg.count[4 - index] / Math.max(...agg.count)) * 100}
                reviews={agg.count[4 - index]}
                rating={5 - index}
                key={index}
              />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessorInfo;
