'use client';
import SiteNavbar from '@/components/Sidebar';
import UnderConstruction from '@/components/UnderConstruction';
import { Button } from '@/components/ui/button';
import { getClasses } from '@/server-actions/classes';

export default function Home() {
  return (
    <UnderConstruction />
    // <div className="p-4 ">
    //   {/* <Button onClick={() => getClasses(12213423, 'GESTSOC')}>
    //     Get Courses!
    //   </Button> */}
    // </div>
  );
}
