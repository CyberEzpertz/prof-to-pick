import { cn, getTier } from '@/lib/utils';
import React from 'react';
import { Separator } from './ui/separator';
import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ProfWithReviewsCourses } from '@/lib/types';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import AvgRating from './AvgRating';
import RatingDist from './RatingDist';

type Props = {
  prof: ProfWithReviewsCourses;
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

export const ProfessorInfo = ({ prof }: Props) => {
  const { tier, tierColor } = getTier(prof.avgRating, prof.reviews.length);

  return (
    <>
      <div className="flex flex-row items-center">
        <div
          className={cn(
            'mr-6 flex size-16 items-center justify-center rounded-lg font-display text-6xl lg:size-20',
            tierColor,
          )}
        >
          {tier}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-extrabold lg:text-4xl">
            {prof.lastName},
          </span>
          <span className="text-base font-medium lg:text-3xl">
            {prof.firstName}
          </span>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-slate-500">
            Based on {prof.reviews.length} reviews
          </span>
          <div className="flex flex-col gap-x-20 gap-y-4 lg:flex-row">
            <AvgRating title="RATING" rating={prof.avgRating || 0} />
            <AvgRating
              title="DIFFICULTY"
              rating={prof.avgDifficulty || 0}
              isDifficulty
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
                    href={`/course/${tag.code}`}
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
        <RatingDist reviews={prof.reviews} />
      </div>
    </>
  );
};

export default ProfessorInfo;
