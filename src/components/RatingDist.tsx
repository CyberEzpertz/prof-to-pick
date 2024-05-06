import { Star } from 'lucide-react';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { getStarsCount } from '@/lib/utils';
import { ReviewWithSubs } from '@/lib/types';

type Props = {};

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
      <Progress
        value={progress}
        color="dark:bg-teal-500"
        className="mx-2 h-3"
      />
      <span className="font-bold">{reviews}</span>
    </div>
  );
};

const RatingDist = ({ reviews }: { reviews: ReviewWithSubs[] }) => {
  const starsCount = getStarsCount(reviews);

  return (
    <div className="flex flex-col">
      <span className="mb-2 font-medium text-slate-400">
        Rating Distribution
      </span>
      <Card className="flex flex-col gap-2 p-4">
        {[...Array(5)].map((_, index) => (
          <RatingProgress
            progress={(starsCount[4 - index] / Math.max(...starsCount)) * 100}
            reviews={starsCount[4 - index]}
            rating={5 - index}
            key={index}
          />
        ))}
      </Card>
    </div>
  );
};

export default RatingDist;
