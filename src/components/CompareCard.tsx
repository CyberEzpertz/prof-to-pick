import { Card, CardContent, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProfWithReviewsCourses } from '@/lib/types';
import { cn, getTier } from '@/lib/utils';
import { Separator } from './ui/separator';
import AvgRating from './AvgRating';
import { Badge } from './ui/badge';
import RatingDist from './RatingDist';
import { ReviewCardCompare } from './ReviewCard';
import { BarChartHorizontal, CircleOff, TrendingUp } from 'lucide-react';
import RemoveCompare from './RemoveCompare';

type Props = {
  prof: ProfWithReviewsCourses;
};

const CompareCard = ({ prof }: Props) => {
  const { tier, tierColor } = getTier(prof.avgRating, prof.reviews.length);

  return (
    <Card className="max-h-[800px] w-[500px] min-w-[400px]">
      <RemoveCompare id={`${prof.id}`} />
      <CardHeader className="flex flex-row items-center pb-0">
        <div
          className={cn(
            'mr-6 flex size-12 items-center justify-center rounded-lg font-display text-4xl lg:size-16 lg:text-5xl',
            tierColor,
          )}
        >
          {tier}
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold">{prof.lastName},</span>
          <span>{prof.firstName}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Separator orientation="horizontal" className="my-3" />

        <Tabs defaultValue="stats">
          <TabsList className="w-full">
            <TabsTrigger value="stats" className="w-full rounded-md">
              <BarChartHorizontal className="mr-2" size={16} />
              Stats
            </TabsTrigger>
            <TabsTrigger value="reviews" className="w-full rounded-md ">
              <TrendingUp className="mr-2" size={16} /> Top Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="flex h-max flex-col gap-4">
            <span className="font-base mt-2 text-sm text-slate-500">
              Based on {prof.reviews.length} reviews
            </span>
            <div className="flex flex-col gap-x-20 gap-y-4">
              <AvgRating
                title="RATING"
                rating={prof.avgRating}
                noIcon
                variant="small"
              />
              <AvgRating
                title="DIFFICULTY"
                rating={prof.avgDifficulty}
                isDifficulty
                noIcon
                variant="small"
              />
            </div>
            <div className="flex flex-col">
              <span className="mb-2 font-medium text-slate-400">
                Most used tags
              </span>
              <Card>
                <CardContent className="flex flex-row flex-wrap gap-2 p-3">
                  {prof.tags.length ? (
                    prof.tags.map((tag, index) => {
                      return (
                        <Badge
                          className="h-8 whitespace-nowrap text-sm"
                          variant="default"
                          key={index}
                        >
                          {tag.replaceAll('_', ' ')}
                        </Badge>
                      );
                    })
                  ) : (
                    <p className="text-sm italic text-slate-400">
                      No tags for this prof. yet...
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
            <RatingDist reviews={prof.reviews} />
          </TabsContent>
          <TabsContent
            value="reviews"
            className="flex flex-col gap-4 overflow-scroll"
          >
            {prof.reviews.length !== 0 ? (
              prof.reviews.map((review) => (
                <ReviewCardCompare key={review.id} review={review} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 pb-4 pt-8 text-sm text-slate-500">
                <CircleOff />
                <span>No reviews yet.</span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CompareCard;
