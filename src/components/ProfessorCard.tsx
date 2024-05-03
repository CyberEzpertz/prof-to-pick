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
        className={cn(
          `flex w-full flex-row gap-2 rounded-3xl rounded-bl-none ${noTier ? 'p-2' : 'pr-4'} shadow-xl transition-all group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-teal-500/50 group-hover:bg-slate-700/20 dark:bg-slate-900/70 md:w-max`,
        )}
      >
        {!noTier && (
          <div
            className={cn(
              'flex w-16 flex-shrink-0 items-center justify-center rounded-bl-none rounded-br-3xl rounded-tl-3xl font-display text-5xl',
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
