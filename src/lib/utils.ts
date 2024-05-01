import { Review } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toProperCase(val: string) {
  return val
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/((?<=( |-)|^).)/g, (s) => s.toUpperCase());
}

export function getAggregates(
  reviews: Review[] | { rating: number; difficulty: number }[],
) {
  const numReviews = reviews.length;
  const agg = reviews.reduce(
    (acc, review) => {
      acc.rating += review.rating;
      acc.diff += review.difficulty;
      acc.count[review.rating - 1] += 1;
      return acc;
    },
    { rating: 0, diff: 0, count: [0, 0, 0, 0, 0] },
  );

  agg.rating /= numReviews;
  agg.diff /= numReviews;
  agg.rating = Number(agg.rating.toFixed(1));
  agg.diff = Number(agg.diff.toFixed(1));

  return agg;
}

export function getTier(rating: number, amount: number) {
  let tier, tierColor;

  if (amount == 0) {
    return { tier: '?', tierColor: 'bg-slate-600' };
  }
  if (rating >= 3.67) {
    tier = 'W';
    tierColor = 'bg-teal-500';
  } else if (rating >= 2.33) {
    tier = 'M';
    tierColor = 'bg-purple-500';
  } else {
    tier = 'L';
    tierColor = 'bg-rose-500';
  }

  return { tier, tierColor };
}
