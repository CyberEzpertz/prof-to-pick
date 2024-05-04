import { cn } from '@/lib/utils';
import { Flame, Star } from 'lucide-react';
import { Progress } from './ui/progress';
import { cva } from 'class-variance-authority';

type ratingProps = {
  title: string;
  rating: number | null;
  isDifficulty?: boolean;
  variant?: 'default' | 'small' | 'xs';
  noIcon?: boolean;
  className?: string;
};

const ratingVariants = cva(
  'mr-3 flex items-center justify-center rounded-lg font-display shrink-0',
  {
    variants: {
      variant: {
        small: 'size-12 text-3xl',
        default: 'size-14 text-4xl',
        xs: 'size-10 text-2xl',
      },
    },
  },
);

const AvgRating = ({
  title,
  rating,
  isDifficulty = false,
  variant = 'default',
  noIcon = false,
  className = '',
}: ratingProps) => {
  const Icon = isDifficulty ? Flame : Star;
  const hexColor = isDifficulty ? '#f43f5e' : '#2dd4bf';
  const twColor = isDifficulty ? 'dark:bg-rose-500' : 'dark:bg-teal-500';

  return (
    <div
      className={cn(`flex ${noIcon ? 'w-full' : 'w-max'} flex-row`, className)}
    >
      <div className={cn(ratingVariants({ variant }), twColor)}>
        {rating ?? '?'}
      </div>
      <div
        className={`flex flex-col justify-center ${noIcon && 'w-full'} gap-y-1`}
      >
        <span className="whitespace-nowrap font-bold">{title}</span>

        {!noIcon ? (
          <div className="flex w-full flex-row">
            {[
              [...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  fill={
                    rating === null || Math.ceil(rating) > index
                      ? hexColor
                      : '#94a3b8'
                  }
                  fillOpacity={
                    rating === null || Math.floor(rating) > index
                      ? 1
                      : Math.ceil(rating) > index
                        ? 0.2 + Number((rating % 1).toFixed(2))
                        : 1
                  }
                  strokeWidth={0}
                  size={20}
                />
              )),
            ]}
          </div>
        ) : (
          <Progress
            value={rating !== null ? (rating / 5) * 100 : 0}
            className={`h-2 w-full`}
            color={`${twColor}`}
          />
        )}
      </div>
    </div>
  );
};

export default AvgRating;
