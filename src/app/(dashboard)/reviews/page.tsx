import BackButton from '@/components/BackButton';
import { ReviewCard } from '@/components/ReviewCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getCurrUserId, getCurrentUserReviews } from '@/lib/fetch';
import { unstable_cache } from 'next/cache';

export default async function Reviews({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const offset = 10;
  const page = searchParams['page'] ? Number(searchParams['page']) : 1;
  const userId = await getCurrUserId();

  const getCachedReviews = unstable_cache(
    getCurrentUserReviews,
    ['userReviews'],
    {
      tags: [`user-${userId}-reviews`],
    },
  );

  const reviews = await getCachedReviews(userId, (page - 1) * offset, offset);
  const numPages = reviews ? Math.ceil(reviews.length / offset) : 0;

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-[7] flex-col p-8">
        <div className="flex w-full flex-row items-center gap-2">
          <BackButton />
          <h1 className="text-nowrap text-2xl font-extrabold">Your Reviews</h1>
          <Pagination className="mr-0 w-max justify-self-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  replace={true}
                  href={`/reviews?page=${Number(page) - 1}`}
                  className={`${page === 1 && 'pointer-events-none text-slate-500'}`}
                  aria-disabled={page === 1}
                  tabIndex={page === 1 ? -1 : 0}
                />
              </PaginationItem>
              {page !== 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      replace={true}
                      href={`/reviews?page=${page - 1}`}
                    >
                      {page - 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationLink
                  replace={true}
                  href={`/reviews?page=${page}#`}
                  isActive
                >
                  {page ?? '1'}
                </PaginationLink>
              </PaginationItem>
              {page + 1 <= numPages && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      replace={true}
                      href={`/reviews?page=${page + 1}`}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  replace={true}
                  href={`/reviews?page=${Number(page) + 1}`}
                  className={`${page === numPages && 'pointer-events-none text-slate-500'}`}
                  aria-disabled={page === numPages}
                  tabIndex={page === numPages ? -1 : 0}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <Separator className="my-6" />
        <ScrollArea>
          <div className="flex flex-col gap-6">
            {reviews?.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                vote={review.votes}
                byCurrentUser={true}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <Separator className="" orientation="vertical" />
      <div className="flex-[4]"></div>
    </div>
  );
}
