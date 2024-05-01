'use client';
import { cn, toProperCase } from '@/lib/utils';
import { Professor } from '@prisma/client';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import ReviewRating from './ReviewRating';
import Link from 'next/link';

interface ProfessorWithRatings extends Professor {
  aveRating: number;
  aveDifficulty: number;
  tier: {
    tier: string;
    tierColor: string;
  };
  _count: {
    reviews: number;
  };
}

type Props = {
  prof: ProfessorWithRatings;
  totalReviews: number;
};

const ProfessorCard = ({ prof }: Props) => {
  return (
    <Link className="group size-max" href={`/professor/${prof.id}`}>
      <Card className="flex w-full flex-row gap-2 overflow-hidden rounded-2xl pr-4 shadow-2xl transition-all group-hover:bg-slate-800/50 md:w-max">
        <div
          className={cn(
            'flex w-16 flex-shrink-0 items-center justify-center font-display text-5xl',
            prof.tier.tierColor,
          )}
        >
          {prof.tier.tier}
        </div>
        <CardContent className="mr-4 flex w-full flex-col gap-2 p-4 ">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{prof.lastName},</span>
            <span>{prof.firstName}</span>
          </div>
          <Separator />
          <span className="text-sm text-slate-400">{`Based on ${prof._count.reviews} reviews`}</span>
          <div className="flex w-full flex-row flex-wrap gap-4">
            <ReviewRating name="RATING" rating={prof.aveRating} />
            <ReviewRating
              name="DIFFICULTY"
              rating={prof.aveDifficulty}
              isDifficulty
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProfessorCard;
