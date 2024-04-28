import { cn } from '@/lib/utils';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import Sidebar from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';
import { unstable_cache } from 'next/cache';
import { checkIsAdmin } from '@/server-actions/users';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await checkIsAdmin();

  return (
    <>
      <Sidebar isAdmin={isAdmin} />
      {children}
    </>
  );
}
