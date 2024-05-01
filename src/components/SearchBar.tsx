'use client';
import { Course, Professor, Review } from '@prisma/client';
import { Button } from './ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn, toProperCase } from '@/lib/utils';
import * as NProgress from 'nprogress';
import { toast } from './ui/use-toast';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { ReviewCardPreview } from './ReviewCard';

type Props = {
  courses: Course[] | null;
  profs: Professor[] | null;
  className?: string;
  recents: Review[] | null;
};

const SearchBar = ({ courses, profs, className = '', recents }: Props) => {
  const isPhone = useMediaQuery('(max-width: 768px)');
  const [suggestions, setSuggestions] = useState<Course[] | Professor[] | null>(
    profs ?? [],
  );
  const [data, setData] = useState<'Professors' | 'Courses'>('Professors');
  const [search, setSearch] = useState('');
  const router = useRouter();

  if (profs === null)
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem fetching professor names.',
    });

  if (courses === null)
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem fetching courses.',
    });

  return (
    <>
      <div className="flex h-[55%] w-full flex-col items-center justify-end gap-2 text-balance p-4">
        <Carousel className="mb-8 h-max w-1/2">
          <CarouselContent className="items-center">
            {recents?.map((review) => (
              <CarouselItem key={review.id} className="basis-11/12">
                <ReviewCardPreview review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <h1 className=" text-balance text-center text-5xl font-bold">
          Audit your {data === 'Professors' ? 'Professors' : 'Courses'}
        </h1>
        <p className="text-center text-slate-400">
          {data === 'Professors'
            ? 'Wanna learn more about a professor? Just type their name below!'
            : "Wanna know about your course's professors? Just type the code below!"}
        </p>
      </div>
      <div
        className={cn(
          'flex h-max w-full flex-row justify-center gap-3',
          className,
        )}
      >
        <Command className="w-full max-w-80 overflow-visible border border-slate-800/50 shadow-md lg:max-w-96">
          <CommandInput
            placeholder={data === 'Professors' ? 'Juan dela Cruz' : 'GESTSOC'}
            value={search}
            onValueChange={setSearch}
          />
          <div className="relative z-50 w-full">
            <CommandList
              className={`absolute max-h-[150px] w-full border border-slate-800/50 bg-slate-950 lg:max-h-[200px] ${!search && 'h-0 overflow-hidden border-0'}`}
            >
              <CommandGroup>
                {search.trim() && suggestions !== null && data === 'Professors'
                  ? (suggestions as Professor[]).map((prof, index) => {
                      return (
                        <CommandItem
                          key={index}
                          onSelect={() => {
                            router.push(`/professor/${prof.id}`);
                            NProgress.start();
                          }}
                        >
                          {toProperCase(prof.firstName)}{' '}
                          {toProperCase(prof.lastName)}
                        </CommandItem>
                      );
                    })
                  : (suggestions as Course[]).map((course, index) => {
                      return (
                        <CommandItem
                          key={index}
                          onSelect={() => {
                            router.push(`/course/${course.code}`);
                            NProgress.start();
                          }}
                        >
                          {course.code}
                        </CommandItem>
                      );
                    })}
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
        {/* {!isPhone && (
          <Link
            href={`/prof/${search}`}
            className={buttonVariants({ variant: 'default' })}
          >
            Search
          </Link>
        )} */}
        <Button
          variant="outline"
          onClick={() => {
            setData(data === 'Courses' ? 'Professors' : 'Courses');
            setSuggestions(data === 'Courses' ? profs : courses);
          }}
          className="h-11 w-32"
        >
          {data === 'Courses' ? (
            <>
              {data}
              <ChevronUp className="ml-1" size={16} color="#64748b" />
            </>
          ) : (
            <>
              {data}
              <ChevronDown className="ml-1" size={16} color="#64748b" />
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
