'use client';

import { handleLike } from '@/server-actions/reviews';
import { Vote } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { startTransition, useOptimistic } from 'react';

type Props = {
  voteCount: number;
  vote: Vote | undefined;
  reviewId: number;
};

type voteState = {
  isLike: boolean | undefined;
  voteCount: number;
};

const VoteButtons = ({ voteCount, vote, reviewId }: Props) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleVote = async (
    type: 'LIKE' | 'DISLIKE',
    oldVote: boolean | undefined,
  ) => {
    let newVote;

    if ((type === 'LIKE') === oldVote) newVote = undefined;
    else newVote = type === 'LIKE';
    startTransition(() => {
      setVoteState(newVote);
    });
    await handleLike(type, oldVote, reviewId, pathname);
  };

  const [voteState, setVoteState] = useOptimistic(
    {
      isLike: vote?.isLike,
      voteCount: voteCount,
    },
    (currVote: voteState, newVote: boolean | undefined) => {
      console.log(
        `Setting Vote! ${currVote.isLike} ${currVote.voteCount} ${newVote} `,
      );
      // Case if the new vote is the same as the old vote
      if (newVote === undefined) {
        return {
          isLike: undefined,
          voteCount: currVote.voteCount + (currVote.isLike ? -1 : 1),
        };
      }

      // Case if there's no vote currently.
      if (currVote.isLike === undefined) {
        return {
          isLike: newVote,
          voteCount: currVote.voteCount + (newVote ? 1 : -1),
        };
      }

      // Case if currVote and newVote are different
      return {
        isLike: newVote,
        voteCount: currVote.voteCount + (newVote ? 2 : -2),
      };
    },
  );

  return (
    <>
      <div>
        <ThumbsUp
          onClick={async () => await handleVote('LIKE', voteState.isLike)}
          strokeWidth={voteState.isLike === true ? 0 : 1}
          fill="#10b981"
          fillOpacity={voteState.isLike === true ? 100 : 0}
          className="mr-2 inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200"
        />
        <ThumbsDown
          onClick={async () => await handleVote('DISLIKE', voteState.isLike)}
          strokeWidth={voteState.isLike === false ? 0 : 1}
          fill="#f43f5e"
          fillOpacity={voteState.isLike === false ? 100 : 0}
          className="mr-4 inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200"
        />
      </div>
      {voteState.voteCount} people found this helpful.
    </>
  );
};

export default VoteButtons;
