import ReviewCardSkeleton from '@/components/skeletons/ReviewCardSkeleton';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CircleArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-[7] flex-col">
        <div className="m-8 mb-0 flex flex-col gap-4">
          <Link
            href="/"
            className=" flex w-max cursor-pointer flex-row gap-3 rounded-md p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
          >
            <CircleArrowLeft />
            Back to search
          </Link>
          <div className="flex flex-row flex-wrap gap-5">
            <Skeleton className="mr-auto h-10 w-36" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-6 overflow-hidden p-8 pb-0">
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </div>
      </div>
      <Separator orientation="vertical" className="my-auto h-[95%]" />
      <div className="flex flex-[4] flex-col justify-center p-8">
        <div className="flex flex-row">
          <Skeleton className="mr-6 size-20" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-80" />
          </div>
        </div>

        <Separator className="my-4" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    </div>
  );
}
