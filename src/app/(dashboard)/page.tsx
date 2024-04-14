'use client';
import SiteNavbar from '@/components/SiteNavbar';
import { Button } from '@/components/ui/button';
import { getTable } from '@/server-actions/test';

const handleClick = async () => {
  await getTable()
    .then((table) => console.log(table))
    .catch((error) => console.log(error));
};

export default function Home() {
  return (
    <div>
      <Button onClick={handleClick}>Click Me!</Button>
    </div>
  );
}
