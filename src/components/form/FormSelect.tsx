import React from 'react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ReportType } from '@prisma/client';
import { enumToProperCase } from '@/lib/utils';

type Props = {
  onValueChange: (value: string) => void;
  defaultValue: string;
  removeUnderScore?: boolean;
  description: string;
  label: string;
  items: string[];
};

const FormSelect = ({
  onValueChange,
  defaultValue,
  removeUnderScore: isEnum = false,
  description,
  label,
  items,
}: Props) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select an item..." />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item} key={item}>
              {isEnum ? enumToProperCase(item) : item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default FormSelect;
