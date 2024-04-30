import { cn } from '@/lib/utils';
import { Flame, LucideIcon, Star } from 'lucide-react';

type ratingProps = {
  name: string;
  rating: number;
  isDifficulty?: boolean;
};

const ReviewRating = ({ name, rating, isDifficulty = false }: ratingProps) => {
  const twColor = isDifficulty ? 'bg-rose-500' : 'bg-teal-500';
  const hexColor = isDifficulty ? '#f43f5e' : '#2dd4bf';
  const Symbol = isDifficulty ? Flame : Star;

  return (
    <div className="m-0 flex w-min flex-row items-center">
      <div
        className={cn(
          'mr-3 flex size-12 flex-none items-center justify-center rounded-lg font-display text-3xl text-slate-200',
          twColor,
        )}
      >
        {rating ?? '?'}
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-nowrap font-bold">{name}</span>
        <div className="flex flex-row">
          {[
            [...Array(5)].map((_, index) => (
              <Symbol
                key={index}
                fill={Math.floor(rating) > index ? hexColor : '#94a3b8'}
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

export default ReviewRating;
