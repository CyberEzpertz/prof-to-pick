'use client';

import Link from 'next/link';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import {
  Bolt,
  Calendar,
  Cat,
  HelpCircle,
  LogOut,
  LucideIcon,
  Search,
  SlashSquare,
  SquareSigma,
  Star,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import nProgress from 'nprogress';
import { useMediaQuery } from 'usehooks-ts';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useEffect, useState } from 'react';

type link = {
  href: string;
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
};

const Sidebar = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const path = usePathname();
  const supabase = supabaseBrowser();
  const isPhone = useMediaQuery('(max-width: 1024px)');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks: link[] = [
    {
      href: '/',
      title: 'Search',
      icon: Search,
    },
    // {
    //   href: '/courses',
    //   title: 'Courses',
    //   icon: Presentation,
    // },
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
    ...(isAdmin
      ? [
          {
            href: '/admin',
            title: 'Admin',
            icon: Cat,
          },
        ]
      : []),
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
        nProgress.start();
        await supabase.auth.signOut({ scope: 'local' });
      },
    },
  ];

  const mobileNav = (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-row items-center whitespace-nowrap p-4 px-6 font-bold">
          <SquareSigma className="mr-3" color="#00e3c4" size={32} />
          Vox et Ratio
        </div>
        <Separator />
      </SheetTrigger>
      <SheetContent side="left" className="border-r-0 shadow-2xl">
        <nav className="flex h-full flex-col gap-3">
          <Link href="/">
            <span className="flex flex-row items-center pl-4 text-3xl font-extrabold">
              <SquareSigma className="mr-3" color="#00e3c4" size={32} /> Vox et
              Ratio
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
                  className="mr-4 h-6 w-6 flex-shrink-0"
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
                    className="mr-4 h-6 w-6 flex-shrink-0"
                    {...(active && { color: '#2dd4bf', strokeWidth: 1 })}
                  />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  const desktopNav = (
    <>
      <nav className="flex h-full flex-col gap-3 px-4 py-5">
        <Link href="/">
          <span className="flex flex-row items-center pl-4 text-3xl font-extrabold">
            <SquareSigma className="mr-3" color="#00e3c4" size={32} /> Vox et
            Ratio
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

  if (!mounted) return desktopNav;

  return <>{isPhone ? mobileNav : desktopNav}</>;
};

export default Sidebar;
