'use client';
import { Fragment, ReactNode } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  items: {
    name?: string;
    groupItems: Record<'label' | 'value', string>[];
  }[];
  defaultValue?: string;
  placeholder?: ReactNode;
  callback: (value: string) => void;
};

const SelectFilter = ({
  items,
  defaultValue,
  placeholder,
  callback,
}: Props) => {
  return (
    <Select
      defaultValue={defaultValue ?? ''}
      onValueChange={(val) => callback(val)}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={placeholder ?? 'Select an item'} />
      </SelectTrigger>
      <SelectContent>
        {items.map((group, index) => (
          <Fragment key={index}>
            {group.name && <SelectLabel>{group.name}</SelectLabel>}
            {group.groupItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Fragment>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
