'use client';
import { Course, Professor } from '@prisma/client';
import { Button } from './ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn, toProperCase } from '@/lib/utils';
import * as NProgress from 'nprogress';
import { toast } from './ui/use-toast';
import { useMediaQuery } from 'usehooks-ts';
import {
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Presentation,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { ReviewCardPreview } from './ReviewCard';
import Autoplay from 'embla-carousel-autoplay';
import { ReviewWithProfName } from '@/lib/types';

type Props = {
  courses: Course[] | null;
  profs: Professor[] | null;
  className?: string;
  recents: ReviewWithProfName[] | null;
};

const SearchBar = ({ courses, profs, className = '', recents }: Props) => {
  const isPhone = useMediaQuery('(max-width: 768px)');
  const [suggestions, setSuggestions] = useState<Course[] | Professor[] | null>(
    profs ?? [],
  );
  const [data, setData] = useState<'Professors' | 'Courses'>('Professors');
  const [search, setSearch] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const scrollId = useRef<ReturnType<typeof setTimeout>>();
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
      <div className="mt-10 flex w-full flex-col items-center justify-end gap-2 text-balance p-4">
        {data === 'Professors' ? (
          <GraduationCap size={64} className="text-teal-500" />
        ) : (
          <Presentation size={64} className="text-teal-500" />
        )}
        <h1 className=" text-balance text-center text-5xl font-extrabold">
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
          'flex h-max w-full flex-row justify-center gap-3 pb-12',
          className,
        )}
      >
        <Command className="w-full max-w-80 overflow-visible border border-slate-800/50 shadow-md lg:max-w-96">
          <CommandInput
            placeholder={data === 'Professors' ? 'Juan dela Cruz' : 'GESTSOC'}
            value={search}
            onValueChange={(val) => {
              setSearch(val);
              scrollId.current = setTimeout(() => {
                const div = listRef.current;
                div?.scrollTo({ top: 0 });
              });
            }}
          />
          <div className="relative z-50 w-full">
            <CommandList
              ref={listRef}
              className={`absolute max-h-[150px] w-full border border-slate-800/50 bg-slate-950 lg:max-h-[200px] ${!search.trim() && 'h-0 overflow-hidden border-0'}`}
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

      <div className="mb-4 flex w-full min-w-0 flex-col items-center gap-4">
        <Carousel
          className="h-max w-4/5 max-w-[700px]"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
        >
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
        <p className="text-sm italic text-slate-500">Recent Reviews</p>
      </div>
    </>
  );
};

export default SearchBar;
