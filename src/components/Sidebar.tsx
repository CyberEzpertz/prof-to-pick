'use client';
import React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import {
  Bolt,
  Calendar,
  GraduationCap,
  HelpCircle,
  LogOut,
  LucideIcon,
  Presentation,
  Search,
  SlashSquare,
  Star,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

type link = {
  href: string;
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
};

const Sidebar = () => {
  const path = usePathname();
  const supabase = supabaseBrowser();

  const navLinks: link[] = [
    {
      href: '/',
      title: 'Search',
      icon: Search,
    },
    {
      href: '/courses',
      title: 'Courses',
      icon: Presentation,
    },
    {
      href: '/compare',
      title: 'Compare',
      icon: SlashSquare,
    },
    {
      href: '/scheduler',
      title: 'Schedule',
      icon: Calendar,
    },
    {
      href: '/reviews',
      title: 'Reviews',
      icon: Star,
    },
  ];

  const bottomLinks: link[] = [
    {
      href: '/help',
      title: 'Help',
      icon: HelpCircle,
    },
    {
      href: '/settings',
      title: 'Settings',
      icon: Bolt,
    },
    {
      href: '/login',
      title: 'Logout',
      icon: LogOut,
      onClick: async () => {
        await supabase.auth.signOut({ scope: 'local' });
      },
    },
  ];

  return (
    <>
      <nav className="flex h-full flex-col gap-3 px-4 py-5">
        <Link href="/">
          <span className="flex flex-row items-center pl-4 text-2xl font-extrabold">
            <GraduationCap className="mr-3" color="#00e3c4" size={32} />{' '}
            ProfToPick
          </span>
        </Link>

        <Separator className="my-3" />

        {navLinks.map((link, index) => {
          const active = path === link.href;

          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({
                  variant: path === link.href ? 'default' : 'ghost',
                  size: 'default',
                }),
                'relative justify-start pl-4 pr-32 text-base font-normal',
                active &&
                  'dark:bg-muted dark:hover:bg-muted  dark:text-white dark:hover:text-white',
                active &&
                  "before:absolute before:left-0 before:h-full before:w-1 before:bg-teal-400 before:p-0 before:content-['']",
              )}
            >
              <link.icon
                className="mr-4 h-6 w-6"
                {...(active && { color: '#2dd4bf', strokeWidth: 2 })}
              />
              {link.title}
            </Link>
          );
        })}

        <div className="mt-auto flex flex-col gap-2">
          {bottomLinks.map((link, index) => {
            const active = path === link.href;

            return (
              <Link
                key={index}
                {...(link.onClick && { onClick: link.onClick })}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: path === link.href ? 'default' : 'ghost',
                    size: 'default',
                  }),
                  'relative justify-start pl-4 pr-32 text-base font-normal',
                  active &&
                    'dark:bg-muted dark:hover:bg-muted font-semibold  dark:text-white dark:hover:text-white',
                  active &&
                    " before:absolute before:left-0 before:h-full before:w-1 before:bg-teal-400 before:p-0 before:content-['']",
                )}
              >
                <link.icon
                  className="mr-4 h-6 w-6"
                  {...(active && { color: '#2dd4bf', strokeWidth: 1 })}
                />
                {link.title}
              </Link>
            );
          })}
        </div>
      </nav>
      <Separator orientation="vertical" />
    </>
  );
};

export default Sidebar;
