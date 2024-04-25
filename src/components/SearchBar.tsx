'use client';
import { Course, Professor } from '@prisma/client';
import { Input } from './ui/input';
import { Button, buttonVariants } from './ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  courses: Course[];
  profs: Professor[];
  className: string;
};

const SearchBar = ({ courses, profs, className }: Props) => {
  const [suggestions, setSuggestions] = useState<Course[] | Professor[]>(profs);
  const [data, setData] = useState<'Professors' | 'Courses'>('Professors');
  const [search, setSearch] = useState('');
  const router = useRouter();

  return (
    <div className={cn('flex h-max flex-row gap-3', className)}>
      <Command className="w-96 border border-slate-800/50 shadow-md">
        <CommandInput
          placeholder={data === 'Professors' ? 'Juan dela Cruz' : 'GESTSOC'}
          value={search}
          onValueChange={setSearch}
        />
        <CommandList className={search ? '' : 'h-0'}>
          <CommandGroup>
            {search && data === 'Professors'
              ? (suggestions as Professor[]).map((prof, index) => {
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        router.push(`/professor/${prof.id}`);
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
                      }}
                    >
                      {course.code}
                    </CommandItem>
                  );
                })}
          </CommandGroup>
        </CommandList>
      </Command>
      <Link
        href={`/prof/${search}`}
        className={buttonVariants({ variant: 'default' })}
      >
        Search
      </Link>
      <Button
        variant="outline"
        onClick={() => {
          console.log(suggestions);
          setData(data === 'Courses' ? 'Professors' : 'Courses');
          setSuggestions(data === 'Courses' ? profs : courses);
        }}
      >
        {data}
      </Button>
    </div>
  );
};

export default SearchBar;
