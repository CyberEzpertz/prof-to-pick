import { cn } from '@/lib/utils';
import { Professor } from '@prisma/client';
import React from 'react';
import { Separator } from './ui/separator';
import { Flame, LucideIcon, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const getTierColor = (tier: string): string => {
  switch (tier) {
    case 'W':
      return 'bg-teal-500';
    case 'M':
      return 'bg-purple-500';
    default:
      return 'bg-rose-500';
  }
};

type Props = {
  tier: string;
  prof: Professor;
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

const ProfessorInfo = ({ tier, prof }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div
          className={cn(
            'mr-6 flex size-20 items-center justify-center rounded-lg font-display text-6xl',
            getTierColor(tier),
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
            Based on X reviews
          </span>
          <div className="flex flex-row gap-20">
            <AverageRating
              hexColor="#2dd4bf"
              icon={Star}
              name="AVG. RATING"
              rating={4.5}
              twColor="bg-teal-500"
            />
            <AverageRating
              hexColor="#f43f5e"
              icon={Flame}
              name="AVG. DIFFICULTY"
              rating={2.4}
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
              {prof.tags.map((tag, index) => {
                return (
                  <Badge
                    className="h-8 whitespace-nowrap text-sm"
                    variant="default"
                    key={index}
                  >
                    {tag.replaceAll('_', ' ')}
                  </Badge>
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
                progress={100}
                reviews={3}
                rating={index + 1}
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
