'use client';
import SiteNavbar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { getClasses } from '@/server-actions/classes';

export default function Home() {
  return (
    <div className="p-4 ">
      <Button onClick={() => getClasses(12213423, 'GESTSOC')}>
        Get Courses!
      </Button>
    </div>
  );
}
