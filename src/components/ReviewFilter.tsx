'use client';
import { useCallback } from 'react';
import { ComboBox } from './ui/combobox';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import SelectFilter from './SelectFilter';

type Props = {
  courses: {
    label: string;
    value: string;
  }[];
};

const ratings = [...Array(5)].map((_, index) => {
  return {
    label: `${5 - index} Star${index === 4 ? '' : 's'}`,
    value: `${5 - index}`,
  };
});

const sorts = [
  {
    label: 'Most Recent',
    value: 'recent',
  },
  {
    label: 'Oldest',
    value: 'oldest',
  },
  {
    label: 'Most Popular',
    value: 'popular',
  },
];
const ReviewFilter = ({ courses }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (value === '') params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <ScrollArea>
      <div className="flex gap-5">
        <ComboBox
          items={courses}
          label="Course"
          callback={(value) => {
            router.replace(`${pathname}?${createQueryString('course', value)}`);
          }}
          initVal={searchParams.get('course')}
        />
        <ComboBox
          items={ratings}
          label="Rating"
          callback={(value) => {
            router.replace(`${pathname}?${createQueryString('rating', value)}`);
          }}
          noSearch
          initVal={
            searchParams.get('rating')
              ? `${searchParams.get('rating')} Stars`
              : 'Rating'
          }
        />
        <SelectFilter
          items={[{ groupItems: sorts }]}
          callback={(value) => {
            router.replace(`${pathname}?${createQueryString('sort', value)}`);
          }}
          defaultValue={searchParams.get('sort') ?? 'recent'}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ReviewFilter;
