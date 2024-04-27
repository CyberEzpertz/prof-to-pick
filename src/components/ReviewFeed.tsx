'use client';

import { Review, Vote } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { useInView } from 'react-intersection-observer';
import { ReviewsWithVotes } from '@/lib/types';
import { LoadingSpinner } from './ui/spinner';
import ReviewCardSkeleton from './skeletons/ReviewCardSkeleton';

type Props = {
  initReviews: ReviewsWithVotes[];
  getReviews: (
    cursor: number,
  ) => Promise<{ reviews: ReviewsWithVotes[]; cursor: number }>;
  initCursor: number;
  offset: number;
  userId: string;
};

let cursor: number;

const ReviewFeed = ({
  initReviews,
  getReviews,
  initCursor,
  offset,
  userId,
}: Props) => {
  const [loaded, setLoaded] = useState<ReviewsWithVotes[]>([]);
  const { ref, inView } = useInView();

  useEffect(() => {
    setLoaded(initReviews);
    cursor = initCursor;
  }, [initReviews, initCursor]);

  useEffect(() => {
    const loadReviews = async () => {
      const { reviews, cursor: newCursor } = await getReviews(cursor);
      cursor = newCursor;
      setLoaded([...loaded, ...reviews]);
    };

    if (inView) {
      loadReviews();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-6">
      {initReviews.length ? (
        <>
          {loaded.length ? (
            loaded.map((review, index) => (
              <ReviewCard
                review={review}
                key={index}
                vote={review.votes}
                {...(userId === review.userId && { byCurrentUser: true })}
              />
            ))
          ) : (
            <>
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
            </>
          )}

          {loaded.length % offset === 0 && (
            <div
              ref={ref}
              className="flex items-center justify-center py-4 italic text-slate-500"
            >
              <LoadingSpinner size={60} />
            </div>
          )}
        </>
      ) : (
        <span className="self-center text-slate-500">No reviews found</span>
      )}
    </div>
  );
};

export default ReviewFeed;
