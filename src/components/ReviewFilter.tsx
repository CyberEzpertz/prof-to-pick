'use client';
import { useCallback } from 'react';
import { ComboBox } from './ui/combobox';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
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

// TODO: Refactor combobox to be responsive
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
    <div className="flex min-w-max max-w-[500px] shrink gap-4">
      <ComboBox
        items={courses}
        label="Course"
        callback={(value) => {
          router.replace(`${pathname}?${createQueryString('course', value)}`);
        }}
        initVal={searchParams.get('course')}
        className="max-w-[150px]"
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
        className="max-w-[150px]"
      />
      <SelectFilter
        items={[{ groupItems: sorts }]}
        callback={(value) => {
          router.replace(`${pathname}?${createQueryString('sort', value)}`);
        }}
        defaultValue={searchParams.get('sort') ?? 'recent'}
      />
    </div>
  );
};

export default ReviewFilter;
