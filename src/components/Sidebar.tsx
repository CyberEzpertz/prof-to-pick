'use client';

import Link from 'next/link';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import {
  Blend,
  Bolt,
  Calendar,
  Cat,
  HelpCircle,
  LogOut,
  LucideIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  SquareSigma,
  Star,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import nProgress from 'nprogress';
import { useMediaQuery } from 'usehooks-ts';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type LinkDetails = {
  href: string;
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
};

const Sidebar = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const path = usePathname();
  const supabase = supabaseBrowser();
  const isPhone = useMediaQuery('(max-width: 1024px)');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const PanelIcon = isOpen ? PanelLeftClose : PanelLeftOpen;

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks: LinkDetails[] = [
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
      icon: Blend,
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

  const bottomLinks: LinkDetails[] = [
    {
      href: '#',
      title: 'Collapse',
      icon: PanelIcon,
      onClick: () => setOpen(!isOpen),
    },
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

  const linkStyle = `relative h-full w-full justify-start p-3 mx-auto text-base font-normal text-slate-400`;

  const activeStyle = `${!isOpen && 'before:opacity-0'} before:duration-500 before:transition-all dark:bg-muted dark:hover:bg-muted  dark:text-white dark:hover:text-white before:absolute before:left-0 before:h-full before:w-1 before:rounded-l-lg before:bg-teal-400 before:p-0 before:content-['']`;

  const createLink = (link: LinkDetails) => {
    const isButton = link.href === '#';
    const active = path === link.href;

    const variants = {
      open: { opacity: 1, y: 0 },
      closed: { opacity: 0, y: 50 },
    };

    const transition = {
      duration: 0.4,
      ease: 'easeOut',
    };

    if (isButton)
      return (
        <Button
          {...(link.onClick && { onClick: link.onClick })}
          variant="ghost"
          className={cn('overflow-hidden', linkStyle, active && activeStyle)}
        >
          <link.icon
            className={`mr-4 shrink-0`}
            {...(active && { color: '#2dd4bf', strokeWidth: 1 })}
          />
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            transition={transition}
          >
            {link.title}
          </motion.div>
        </Button>
      );

    return (
      <Link
        {...(link.onClick && { onClick: link.onClick })}
        href={link.href}
        className={cn(
          'overflow-hidden',
          buttonVariants({
            variant: path === link.href ? 'default' : 'ghost',
            size: 'default',
          }),
          linkStyle,
          active && activeStyle,
        )}
      >
        <link.icon
          className={`mr-4 shrink-0`}
          {...(active && { color: '#2dd4bf', strokeWidth: 2 })}
        />
        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
          transition={transition}
        >
          {link.title}
        </motion.div>
      </Link>
    );
  };

  const mobileNav = (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-row items-center whitespace-nowrap p-4 px-6 font-bold">
          <SquareSigma className="mr-3" color="#00e3c4" size={32} />
          voxetratio.
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
      <nav
        className={`flex h-full flex-col gap-3 bg-slate-900/20 px-4 py-5 ${isOpen ? 'w-80' : 'w-20'} overflow-hidden transition-all duration-500`}
      >
        <Link href="/">
          <span
            className={`flex w-max flex-row items-center pl-2 ${isOpen && 'pr-4'} h-10 text-3xl font-extrabold`}
          >
            <SquareSigma
              className={`${isOpen && 'mr-3'}`}
              color="#00e3c4"
              size={32}
            />
            {isOpen && 'voxetratio.'}
          </span>
        </Link>

        <Separator className="my-3" />

        <div
          className={`flex flex-col ${isOpen ? 'items-stretch' : 'items-center'} gap-2`}
        >
          {navLinks.map(createLink)}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {bottomLinks.map(createLink)}
        </div>
      </nav>
      <Separator orientation="vertical" />
    </>
  );

  if (!mounted) return desktopNav;

  return <>{isPhone ? mobileNav : desktopNav}</>;
};

export default Sidebar;
