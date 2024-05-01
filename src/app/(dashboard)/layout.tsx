import Sidebar from '@/components/Sidebar';
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
