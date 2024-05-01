'use client';
import { cn, getTier } from '@/lib/utils';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import ReviewRating from './ReviewRating';
import Link from 'next/link';
import { ProfWithReviewCount } from '@/lib/types';

type Props = {
  prof: ProfWithReviewCount;
  noTier?: boolean;
};

const ProfessorCard = ({ prof, noTier = false }: Props) => {
  const tier = getTier(prof.avgRating, prof._count.reviews);

  return (
    <Link className="group size-max" href={`/professor/${prof.id}`}>
      <Card
        className={`flex w-full flex-row gap-2 overflow-hidden rounded-2xl ${noTier ? 'p-4' : 'pr-4'} shadow-2xl transition-all group-hover:bg-slate-800/50 md:w-max`}
      >
        {!noTier && (
          <div
            className={cn(
              'flex w-16 flex-shrink-0 items-center justify-center font-display text-5xl',
              tier.tierColor,
            )}
          >
            {tier.tier}
          </div>
        )}
        <CardContent className="mr-4 flex w-full flex-col gap-2 p-4 ">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{prof.lastName},</span>
            <span>{prof.firstName}</span>
          </div>
          <Separator />
          <span className="text-sm text-slate-400">{`Based on ${prof._count.reviews} reviews`}</span>
          <div className="flex w-full flex-row flex-wrap gap-4">
            <ReviewRating
              name="RATING"
              rating={prof.avgRating}
              variation="noStar"
            />
            <ReviewRating
              name="DIFFICULTY"
              rating={prof.avgDifficulty}
              isDifficulty
              variation="noStar"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProfessorCard;
