import { cn } from '@/lib/utils';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import SiteNavbar from '@/components/SiteNavbar';
import { Separator } from '@/components/ui/separator';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteNavbar />
      {children}
    </>
  );
}
