import { cn } from '@/lib/utils';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import SiteNavbar from '@/components/SiteNavbar';

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
