import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReviewWithSubs } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toProperCase(val: string) {
  return val
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/((?<=( |-)|^).)/g, (s) => s.toUpperCase());
}

export function getStarsCount(reviews: ReviewWithSubs[]) {
  const ratings = reviews.reduce(
    (acc, review) => {
      acc[review.rating! - 1] += 1;
      acc[review.rating! - 1] += 1 * review.subReviews.length;

      return acc;
    },
    [0, 0, 0, 0, 0],
  );

  return ratings;
}

export function getTier(rating: number | null, amount: number) {
  let tier, tierColor;

  if (amount == 0 || rating === null) {
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

export function convertTime(time: number) {
  const hour = Math.floor(time / 100);
  const minutes = time % 100;

  return `${hour > 12 ? hour - 12 : hour}:${minutes > 10 ? '' : '0'}${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
}
