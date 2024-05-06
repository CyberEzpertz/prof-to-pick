'use client';

import React, { useEffect, useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { useInView } from 'react-intersection-observer';
import { ReviewWithVotes } from '@/lib/types';
import { LoadingSpinner } from './ui/spinner';
import ReviewCardSkeleton from './skeletons/ReviewCardSkeleton';
import { motion } from 'framer-motion';
import { CircleOff } from 'lucide-react';

type Props = {
  initReviews: ReviewWithVotes[];
  getReviews: (
    cursor: number,
  ) => Promise<{ reviews: ReviewWithVotes[]; cursor: number }>;
  initCursor: number;
  offset: number;
  userId: string;
  isAdmin?: boolean;
  courses: string[];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
  },
};

let cursor: number;

const ReviewFeed = ({
  initReviews,
  getReviews,
  initCursor,
  offset,
  userId,
  isAdmin = false,
  courses,
}: Props) => {
  const [loaded, setLoaded] = useState<ReviewWithVotes[]>([]);
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
    <div className="flex flex-col">
      {initReviews.length ? (
        <>
          {loaded.length ? (
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              {loaded.map((review, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                >
                  <ReviewCard
                    review={review}
                    vote={review.votes}
                    byCurrentUser={userId === review.userId}
                    isAdmin={isAdmin}
                    courses={courses}
                  />
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="flex h-full w-full flex-col gap-6 overflow-scroll">
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
              <ReviewCardSkeleton />
            </div>
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
        <span className="mt-4 flex flex-col items-center gap-4 self-center pb-8 text-slate-500">
          <CircleOff size={48} /> No reviews for this professor yet.
        </span>
      )}
    </div>
  );
};

export default ReviewFeed;
