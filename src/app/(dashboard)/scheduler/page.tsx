import BackButton from '@/components/BackButton';
import Calendar from '@/components/Calendar';
import ScheduleSelect from '@/components/ScheduleSelect';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { columns } from '@/components/columns';
import { getCourseClasses } from '@/lib/fetch';
import { generateSchedules } from '@/server-actions/classes';
import { CalendarFold, SlidersVertical } from 'lucide-react';

export default async function Scheduler({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const schedules = await generateSchedules();
  const courseClasses = await getCourseClasses('CSSWENG');
  const schedIndex = Number.isNaN(Number(searchParams['schedule']))
    ? 0
    : Number(searchParams['schedule']);

  const scheduleItems = schedules.map((_, index) => {
    return { label: `Schedule ${index}`, value: `${index}` };
  });

  return (
    <Tabs
      className="flex h-full w-full min-w-0 flex-col"
      defaultValue="Parameters"
    >
      <div className="flex gap-2 border-b border-slate-800 p-8">
        <BackButton />
        <h1 className="text-3xl font-extrabold text-slate-100">Scheduler</h1>
        <TabsList className="ml-auto">
          <TabsTrigger value="Parameters">
            <SlidersVertical className="mr-2" size={16} />
            Parameters
          </TabsTrigger>
          <TabsTrigger value="Schedules">
            <CalendarFold className="mr-2" size={16} /> Schedules
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="Parameters" className="mt-0 flex-col">
        {courseClasses && (
          <DataTable columns={columns} data={courseClasses}></DataTable>
        )}
      </TabsContent>
      <TabsContent
        value="Schedules"
        className="mt-0 h-full min-h-0 w-full gap-4"
      >
        <div className="flex h-full min-h-0 flex-col">
          <ScheduleSelect schedules={scheduleItems} />
          <Calendar courses={schedules[schedIndex]} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
