import { cn, getTier } from '@/lib/utils';
import React from 'react';
import { Separator } from './ui/separator';
import { Blend } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ProfWithReviewsCourses } from '@/lib/types';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import AvgRating from './AvgRating';
import RatingDist from './RatingDist';

type Props = {
  prof: ProfWithReviewsCourses;
};

export const ProfessorInfo = ({ prof }: Props) => {
  const { tier, tierColor } = getTier(prof.avgRating, prof.reviews.length);

  return (
    <div className="m-auto flex w-full shrink flex-col gap-4">
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

      <Separator className="" />

      <div className="flex flex-col gap-4 2xl:gap-6">
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={`/compare?profs=${prof.id}`}
        >
          <Blend className="mr-2" /> Compare Professor
        </Link>
        <div className="flex flex-col">
          <span className="mb-2 font-medium text-slate-500">
            Based on {prof._count.reviews} reviews
          </span>
          <div className="flex flex-col gap-x-8 gap-y-4 md:max-xl:flex-wrap lg:flex-row">
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
    </div>
  );
};

export default ProfessorInfo;
