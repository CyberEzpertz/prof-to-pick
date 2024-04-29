'use client';
import { Course, Professor } from '@prisma/client';
import { Button, buttonVariants } from './ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import nProgress, * as NProgress from 'nprogress';
import { toast, useToast } from './ui/use-toast';
import { useMediaQuery } from 'usehooks-ts';

type Props = {
  courses: Course[] | undefined;
  profs: Professor[] | undefined;
  className: string;
};

const SearchBar = ({ courses, profs, className }: Props) => {
  const isPhone = useMediaQuery('(max-width: 768px)');
  const [suggestions, setSuggestions] = useState<
    Course[] | Professor[] | undefined
  >(profs ?? []);
  const [data, setData] = useState<'Professors' | 'Courses'>('Professors');
  const [search, setSearch] = useState('');
  const router = useRouter();

  if (profs === undefined)
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem fetching professor names.',
    });

  if (courses === undefined)
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem fetching courses.',
    });

  return (
    <div
      className={cn(
        'flex h-max w-full flex-row justify-center gap-3',
        className,
      )}
    >
      <Command className="w-full max-w-80 border border-slate-800/50 shadow-md lg:max-w-96">
        <CommandInput
          placeholder={data === 'Professors' ? 'Juan dela Cruz' : 'GESTSOC'}
          value={search}
          onValueChange={setSearch}
        />
        <CommandList className={search ? '' : 'h-0'}>
          <CommandGroup>
            {search.trim() && suggestions !== undefined && data === 'Professors'
              ? (suggestions as Professor[]).map((prof, index) => {
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        router.push(`/professor/${prof.id}`);
                        NProgress.start();
                      }}
                    >
                      {prof.firstName
                        .toLowerCase()
                        .replace(/((?<=( |-)|^).)/g, (s) =>
                          s.toUpperCase(),
                        )}{' '}
                      {prof.lastName
                        .toLowerCase()
                        .replace(/((?<=( |-)|^).)/g, (s) => s.toUpperCase())}
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
        className="h-11 w-28"
      >
        {data}
      </Button>
    </div>
  );
};

export default SearchBar;
