import { cn } from '@/lib/utils';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import Sidebar from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
