'use client';

import { handleVote } from '@/server-actions/votes';
import { Vote } from '@prisma/client';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useOptimistic } from 'react';
import { toast } from './ui/use-toast';
import { AnimationScope, useAnimate } from 'framer-motion';

type Props = {
  voteCount: number;
  vote: Vote | undefined;
  reviewId: number;
  isPhone: boolean;
};

type voteState = {
  isLike: boolean | undefined;
  voteCount: number;
};

const VoteButtons = ({ voteCount, vote, reviewId, isPhone }: Props) => {
  const pathname = usePathname();
  const [likeRef, animateLike] = useAnimate();
  const [dislikeRef, animateDislike] = useAnimate();

  const handleSubmit = async (
    type: 'LIKE' | 'DISLIKE',
    oldVote: boolean | undefined,
    ref: AnimationScope<any>,
  ) => {
    let newVote;

    await animateLike(
      ref.current,
      { scale: 1.5, rotate: -10 },
      { duration: 0.1, ease: 'easeOut' },
    );
    await animateLike(
      ref.current,
      { scale: 1, rotate: 0 },
      { delay: 0.2, duration: 0, ease: 'easeIn' },
    );

    if ((type === 'LIKE') === oldVote) {
      newVote = undefined;
    } else newVote = type === 'LIKE';

    setVoteState(newVote);

    const vote = await handleVote(type, oldVote, reviewId, pathname);
    if (vote === undefined) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem voting on that post, try again.',
      });
    }
  };

  const [voteState, setVoteState] = useOptimistic(
    {
      isLike: vote?.isLike,
      voteCount: voteCount,
    },
    (currVote: voteState, newVote: boolean | undefined) => {
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
      <div className="flex flex-row gap-2">
        <ThumbsUp
          ref={likeRef}
          onClick={() => handleSubmit('LIKE', voteState.isLike, likeRef)}
          strokeWidth={voteState.isLike === true ? 0 : 1}
          fill="#10b981"
          fillOpacity={voteState.isLike === true ? 100 : 0}
          className="inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200"
        />
        {isPhone && (
          <span className={`mx-2 font-medium`}>{voteState.voteCount}</span>
        )}
        <ThumbsDown
          ref={dislikeRef}
          onClick={() => handleSubmit('DISLIKE', voteState.isLike, dislikeRef)}
          strokeWidth={voteState.isLike === false ? 0 : 1}
          fill="#f43f5e"
          fillOpacity={voteState.isLike === false ? 100 : 0}
          className="inline-flex cursor-pointer text-slate-400 transition-colors duration-300 hover:text-slate-200 lg:mr-4"
        />
      </div>
      <span className="font-medium">
        {!isPhone &&
          `${voteState.voteCount} ${voteState.voteCount === 1 ? 'person' : 'people'} found this helpful`}
      </span>
    </>
  );
};

export default VoteButtons;
