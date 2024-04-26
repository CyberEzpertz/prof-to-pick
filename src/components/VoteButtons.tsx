'use client';

import { ReviewVotes } from '@/lib/types';
import { fetchVotes, handleVote } from '@/server-actions/votes';
import { Vote } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { startTransition, useOptimistic, useState } from 'react';

type Props = {
  voteCount: number;
  reviewId: number;
};

const computeCount = (old: ReviewVotes) => {
  if (old.votes.length === 0) {
    return {
      votes: [{ ...old.votes[0], isLike: type === 'LIKE' }],
      voteCount: old.voteCount + (type === 'LIKE' ? 1 : -1),
    };
  }

  if (old.votes[0].isLike === (type === 'LIKE')) {
    return {
      votes: [],
      voteCount: old.voteCount + (type === 'LIKE' ? -1 : 1),
    };
  }

  // Case if currVote and newVote are different
  return {
    votes: [{ ...old.votes[0], isLike: type === 'LIKE' }],
    voteCount: old.voteCount + (type === 'LIKE' ? 2 : -2),
  };
};

const VoteButtons = ({ voteCount, reviewId }: Props) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  // const [voteState, setVoteState] = useOptimistic(
  //   {
  //     isLike: vote?.isLike,
  //     voteCount: voteCount,
  //   },
  //   (currVote: voteState, newVote: boolean | undefined) => {
  //     console.log(
  //       `Setting Vote! ${currVote.isLike} ${currVote.voteCount} ${newVote} `,
  //     );
  //     // Case if the new vote is the same as the old vote
  //     if (newVote === undefined) {
  //       return {
  //         isLike: undefined,
  //         voteCount: currVote.voteCount + (currVote.isLike ? -1 : 1),
  //       };
  //     }

  //     // Case if there's no vote currently.
  //     if (currVote.isLike === undefined) {
  //       return {
  //         isLike: newVote,
  //         voteCount: currVote.voteCount + (newVote ? 1 : -1),
  //       };
  //     }

  //     // Case if currVote and newVote are different
  //     return {
  //       isLike: newVote,
  //       voteCount: currVote.voteCount + (newVote ? 2 : -2),
  //     };
  //   },
  // );

  const { data, isLoading } = useQuery({
    queryFn: () => fetchVotes(reviewId),
    queryKey: ['votes', { votesOnReview: reviewId }],
  });

  const { mutateAsync, variables } = useMutation({
    mutationFn: async ({
      type,
      voteCount,
    }: {
      type: 'LIKE' | 'DISLIKE';
      voteCount: number;
    }) => {
      handleVote(type, true, reviewId, pathname);
      const previousVote = queryClient.getQueryData([
        { votesOnReview: reviewId },
      ]);

      queryClient.setQueryData(
        [{ votesOnReview: reviewId }],
        (old: ReviewVotes) => computeCount(old),
      );

      return { previousVote };
    },
    // onError: (err, newVote, context) => {
    //   queryClient.setQueryData(
    //     [{ votesOnReview: reviewId }],
    //     context.previousVote,
    //   );
    // },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });

  return (
    <>
      <div>
        <ThumbsUp
          onClick={async () =>
            await mutateAsync({ type: 'LIKE', voteCount: voteCount })
          }
          strokeWidth={data?.votes[0]?.isLike === true ? 0 : 1}
          fill="#10b981"
          fillOpacity={data?.votes[0]?.isLike === true ? 100 : 0}
          className="mr-2 inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200"
        />
        <ThumbsDown
          onClick={async () =>
            await mutateAsync({ type: 'DISLIKE', voteCount: voteCount })
          }
          strokeWidth={data?.votes[0]?.isLike === false ? 0 : 1}
          fill="#f43f5e"
          fillOpacity={data?.votes[0]?.isLike === false ? 100 : 0}
          className="mr-4 inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200"
        />
      </div>
      {data?.voteCount} people found this helpful.
    </>
  );
};

export default VoteButtons;
