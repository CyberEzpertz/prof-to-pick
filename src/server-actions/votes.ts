'use server';

import prisma from '@/db/prisma/prisma';
import { createServer } from '@/lib/supabase/server';

export const fetchVotes = async (reviewId: number) => {
  const supabase = createServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return;
  }

  const userId = data.user?.id as string;

  const vote = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    select: {
      voteCount: true,
      votes: {
        where: {
          userId: userId,
        },
      },
    },
  });

  return vote;
};

export const handleVote = async (
  type: 'LIKE' | 'DISLIKE',
  oldVote: boolean | undefined,
  reviewId: number,
  pathname: string,
) => {
  const supabase = createServer();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return;
  }

  const userId = data.user?.id as string;
  // console.log(reviewId, userId);

  try {
    if (oldVote === undefined) {
      const vote = await prisma.vote.create({
        data: {
          isLike: type === 'LIKE',
          reviewId: reviewId,
          userId: userId,
        },
      });

      return vote;
    }

    // Checks if they have the same value
    if (oldVote === (type === 'LIKE')) {
      const vote = await prisma.vote.delete({
        where: {
          userId_reviewId: {
            reviewId: reviewId,
            userId: userId,
          },
        },
      });

      return vote;
    }

    // This section will only execute when the old vote and new vote are different

    const vote = await prisma.vote.update({
      where: {
        userId_reviewId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
      data: {
        isLike: type === 'LIKE',
      },
    });

    return vote;
  } catch (error) {
    console.error('Encountered problem in liking/disliking');
    console.error(error);

    return undefined;
  }
};
