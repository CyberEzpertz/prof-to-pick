'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export function ComboBox({
  items,
  label,
  callback,
  className,
  width,
  noSearch = false,
  initVal,
}: {
  items: {
    label: string;
    value: string;
  }[];
  label: string;
  callback?: (value: string) => void;
  className?: string;
  width?: string;
  noSearch?: boolean;
  initVal: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initVal ?? '');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(`w-[200px] justify-between`, className, width)}
        >
          {value || label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(`w-[200px] p-0`, width)} align="start">
        <Command className="border border-slate-800/50 shadow-md">
          {!noSearch && <CommandInput placeholder={label} />}
          <CommandList>
            {items.length === 0 && (
              <CommandEmpty className="py-3 text-slate-400">
                Empty...
              </CommandEmpty>
            )}
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    if (callback !== undefined)
                      callback(currentValue === value ? '' : item.value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.label ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
