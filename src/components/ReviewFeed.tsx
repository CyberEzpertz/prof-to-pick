'use client';

import { Review, Vote } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { useInView } from 'react-intersection-observer';
import { ReviewsWithVotes } from '@/lib/types';
import { LoadingSpinner } from './ui/spinner';

type Props = {
  initReviews: ReviewsWithVotes[];
  getReviews: (
    cursor: number,
  ) => Promise<{ reviews: ReviewsWithVotes[]; cursor: number }>;
  initCursor: number;
  offset: number;
};

const ReviewFeed = ({ initReviews, getReviews, initCursor, offset }: Props) => {
  const [loaded, setLoaded] = useState<ReviewsWithVotes[]>([]);
  const [cursor, setCursor] = useState<number>(initCursor);
  const { ref, inView } = useInView();

  useEffect(() => {
    setLoaded(initReviews);
    setCursor(initCursor);
  }, [initReviews, initCursor]);

  useEffect(() => {
    const loadReviews = async () => {
      const { reviews, cursor: newCursor } = await getReviews(cursor);
      setCursor(newCursor);
      setLoaded([...loaded, ...reviews]);
      console.log(reviews);
    };

    if (inView) {
      loadReviews();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-6">
      {initReviews.length ? (
        <>
          {loaded.map((review, index) => (
            <ReviewCard review={review} key={index} vote={review.votes} />
          ))}

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
