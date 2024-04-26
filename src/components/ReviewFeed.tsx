'use client';

import { Review, Vote } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { useInView } from 'react-intersection-observer';
import { ReviewsWithVotes } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/server-actions/reviews';
import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { LoadingSpinner } from './ui/spinner';

type Props = {
  professorId: number;
  initReviews: ReviewsWithVotes[];
};

const ReviewFeed = ({ professorId, initReviews }: Props) => {
  const handleFetch = async ({ pageParam }: { pageParam: number }) => {
    console.log('Fetching Reviews...');
    return fetchReviews(professorId, pageParam, '');
  };

  const { ref, inView } = useInView();

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['reviews'],
      queryFn: handleFetch,
      initialPageParam: -1,
      getNextPageParam: (lastPage) => {
        return lastPage?.slice(-1)?.pop()?.id;
      },
      refetchOnWindowFocus: false,
      initialData: {
        pages: [initReviews],
        pageParams: [initReviews?.slice(-1)?.pop()?.id ?? -999],
      },
    });

  console.log(initReviews);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (error && error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return (
      <div className="mb-20 flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data?.pages.length ? (
        <>
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.map((review, index) => (
                <ReviewCard review={review} key={index} vote={review.votes} />
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <div className="my-5 flex items-center justify-center" ref={ref}>
              <LoadingSpinner size={48} />
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
