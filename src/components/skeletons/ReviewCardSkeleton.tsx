import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

type Props = {};

const ReviewRatingSkeleton = () => {
  return (
    <div className="m-0 ml-8 flex w-min flex-row">
      <Skeleton className="mr-3 flex size-14 items-center justify-center rounded-lg font-display text-3xl" />
      <div className="flex flex-col justify-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};

const ReviewCardSkeleton = () => {
  return (
    <Card className="flex flex-col rounded-2xl border-0 p-2 dark:bg-slate-900 ">
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex flex-col gap-2">
          <Skeleton className="size-full h-8 w-40" />
          <Skeleton className="size-full h-3 w-64" />
        </div>
        <div className="ml-auto inline-flex">
          <ReviewRatingSkeleton />
          <ReviewRatingSkeleton />
        </div>
      </CardHeader>
      <CardContent className="pb-4 ">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[40%]" />
        </div>
        <Separator className="my-4" />
        <div className="flex flex-row gap-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-7 w-32" />
        </div>
      </CardContent>
      <CardFooter className="justify-start text-slate-400">
        <Skeleton className=" h-7 w-64" />
      </CardFooter>
    </Card>
  );
};

export default ReviewCardSkeleton;
