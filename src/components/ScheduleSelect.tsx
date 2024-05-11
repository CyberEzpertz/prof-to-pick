'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useRouter } from 'next/navigation';

type Props = {
  schedules: Record<'label' | 'value', string>[];
};

const ScheduleSelect = ({ schedules }: Props) => {
  const router = useRouter();

  return (
    <Select
      onValueChange={(val) => router.replace(`/scheduler/schedule=${val}`)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {schedules.map((_, index) => (
          <SelectItem key={index} value={`${index}`}>
            Schedule {index}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ScheduleSelect;
