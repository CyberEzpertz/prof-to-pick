'use client';

import { Review } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { useInView } from 'react-intersection-observer';

type Props = {
  initReviews: Review[];
  getReviews: (
    cursor: number,
  ) => Promise<{ reviews: Review[]; cursor: number }>;
  initCursor: number;
  offset: number;
};

const ReviewFeed = ({ initReviews, getReviews, initCursor, offset }: Props) => {
  const [loaded, setLoaded] = useState<Review[]>([]);
  const [cursor, setCursor] = useState<number>(initCursor);
  const [isEnd, setIsEnd] = useState<boolean>(loaded.length % offset !== 0);
  const { ref, inView } = useInView();

  useEffect(() => {
    setLoaded(initReviews);
  }, [initReviews]);

  useEffect(() => {
    const loadReviews = async () => {
      const { reviews, cursor: newCursor } = await getReviews(cursor);
      setCursor(newCursor);
      setLoaded([...loaded, ...reviews]);
      if (reviews.length < offset) setIsEnd(true);
      console.log(reviews);
    };

    if (inView) {
      loadReviews();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-6">
      {loaded.length ? (
        <>
          {loaded.map((review, index) => (
            <ReviewCard review={review} key={index} />
          ))}

          {!isEnd && (
            <div
              ref={ref}
              className="flex items-center justify-center italic text-slate-500"
            >
              Loading...
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
