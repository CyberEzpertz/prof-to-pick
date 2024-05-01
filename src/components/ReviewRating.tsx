import { cn } from '@/lib/utils';
import { Flame, Star } from 'lucide-react';

type ratingProps = {
  name: string;
  rating: number | null;
  isDifficulty?: boolean;
  variation?: 'default' | 'noStar';
};

const ReviewRating = ({
  name,
  rating,
  isDifficulty = false,
  variation = 'default',
}: ratingProps) => {
  const twColor = isDifficulty ? 'bg-rose-500/80' : 'bg-teal-500/80';
  const hexColor = isDifficulty ? '#f43f5e' : '#2dd4bf';
  const Symbol = isDifficulty ? Flame : Star;

  return (
    <div className="m-0 flex w-min flex-row items-center">
      <div
        className={cn(
          `mr-3 flex flex-none items-center justify-center rounded-lg font-display text-3xl text-slate-50 `,
          variation === 'default' ? 'size-12' : 'size-9',
          variation === 'noStar' ? 'text-xl' : '',
          twColor,
        )}
      >
        {rating ?? '?'}
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-nowrap font-bold">{name}</span>
        {variation !== 'noStar' && (
          <div className="flex flex-row">
            {[
              [...Array(5)].map((_, index) => (
                <Symbol
                  key={index}
                  fill={
                    rating
                      ? Math.floor(rating) > index
                        ? hexColor
                        : '#94a3b8'
                      : '#94a3b8'
                  }
                  strokeWidth={0}
                  size={18}
                />
              )),
            ]}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewRating;
