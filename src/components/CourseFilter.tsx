'use client';
import { useCallback } from 'react';
import { ComboBox } from './ui/combobox';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Tag } from '@prisma/client';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Toggle } from './ui/toggle';

const tiers = [
  {
    label: 'W',
    value: 'W',
    color: 'dark:data-[state=on]:bg-teal-700',
  },
  {
    label: 'M',
    value: 'M',
    color: 'dark:data-[state=on]:bg-purple-700',
  },
  {
    label: 'L',
    value: 'L',
    color: 'dark:data-[state=on]:bg-rose-700',
  },
];

const sorts = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Highest Rated',
    value: 'highest',
  },
  {
    label: 'Most Reviewed',
    value: 'mostReviewed',
  },
  {
    label: 'Most Difficult',
    value: 'mostDifficult',
  },
];

const tags = Object.values(Tag).map((tag) => ({
  label: tag.replaceAll('_', ' '),
  value: tag,
}));

const CourseFilters = () => {
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
      <div className="flex items-center gap-5">
        <Toggle
          variant="outline"
          defaultPressed={true}
          onPressedChange={(pressed) => {
            if (!pressed)
              router.replace(
                `${pathname}?${createQueryString('group', 'false')}`,
              );
            else
              router.replace(`${pathname}?${createQueryString('group', '')}`);
          }}
        >
          Group By Tier
        </Toggle>
        <p className="text-sm text-slate-400">Tiers</p>
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            router.replace(`${pathname}?${createQueryString('tier', value)}`);
          }}
          defaultValue={searchParams.get('tier') ?? undefined}
        >
          {tiers.map((tier) => (
            <ToggleGroupItem
              key={tier.label}
              value={tier.value}
              className={tier.color}
            >
              {tier.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="text-sm text-slate-400">Sort By</p>
        <ComboBox
          items={sorts}
          label="Sort by"
          callback={(value) => {
            {
              router.replace(`${pathname}?${createQueryString('sort', value)}`);
            }
          }}
          noSearch
          initVal={
            sorts.find((sort) => sort.value === searchParams.get('sort'))
              ?.label ?? 'Name'
          }
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CourseFilters;
