'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  items: {
    label: string;
    value: string;
  }[];
  children: ReactNode;
  disabled: boolean;
};

const CmdkDialogBtn = ({ items, children, disabled }: Props) => {
  const [search, setSearch] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const scrollId = useRef<ReturnType<typeof setTimeout>>();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.append(name, value);
      if (value === '') params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    if (!disabled) document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [disabled]);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(!disabled)}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type the professor's name..."
          value={search}
          onValueChange={(val) => {
            setSearch(val);
            scrollId.current = setTimeout(() => {
              const div = listRef.current;
              div?.scrollTo({ top: 0 });
            });
          }}
        />
        <CommandList ref={listRef}>
          <CommandEmpty>No professors found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {items.map((item) => {
              if (!searchParams.getAll('profs').includes(item.value))
                return (
                  <CommandItem
                    className="h-9"
                    key={item.value}
                    onSelect={() => {
                      setOpen(false);
                      router.replace(
                        `${pathname}?${createQueryString('profs', item.value)}`,
                      );
                    }}
                  >
                    {item.label}
                  </CommandItem>
                );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CmdkDialogBtn;
