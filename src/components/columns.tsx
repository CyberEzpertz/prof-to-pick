'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ClassDetails } from '../lib/types';
import { convertTime, toProperCase } from '../lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import {
  ArrowDown,
  ArrowDownAZ,
  ArrowUp,
  ArrowUpAz,
  ArrowUpDown,
} from 'lucide-react';

export const columns: ColumnDef<ClassDetails>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'course_code',
    header: 'Course',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'section',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Section{' '}
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 size-4" />
            ) : (
              <ArrowDown className="ml-2 size-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 size-4 text-slate-600" />
          )}
        </Button>
      );
    },
  },
  {
    id: 'professor',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Professor{' '}
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? (
              <ArrowUpAz className="ml-2 size-4" />
            ) : (
              <ArrowDownAZ className="ml-2 size-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 size-4 text-slate-600" />
          )}
        </Button>
      );
    },
    accessorFn: (row) => {
      if (!row.professor) return 'N/A';

      return `${toProperCase(row.professor.lastName)}, ${toProperCase(row.professor.firstName)}`;
    },
  },
  {
    accessorFn: (row) => `${row.enrolled}/${row.cap}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Slots{' '}
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 size-4" />
            ) : (
              <ArrowDown className="ml-2 size-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 size-4 text-slate-600" />
          )}
        </Button>
      );
    },
    id: 'slots',
  },
  {
    header: 'Modality',
    accessorKey: 'modality',
    id: 'modality',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: 'Schedule',
    accessorFn: (row) => {
      const start1 = convertTime(row.schedules[0].start);
      const end1 = convertTime(row.schedules[0].end);

      if (row.schedules.length === 2) {
        const start2 = convertTime(row.schedules[1].start);
        const end2 = convertTime(row.schedules[1].end);

        return `${start1} - ${end1} ${start2} - ${end2}`;
      }

      return `${start1} - ${end1}`;
    },
    cell: ({ row }) => {
      const data = row.original;
      const hasF2F = ['F2F', 'HYBRID'].includes(data.modality);
      let modalities;

      if (hasF2F && row.getValue('room') === 'N/A') {
        modalities = ['?', '?'];
      } else {
        modalities = hasF2F
          ? data.rooms.map((val) => {
              return val ? 'F' : 'O';
            })
          : [];
      }

      return (
        <div>
          {data.schedules.map(({ start, end }, i) => (
            <div
              key={i}
            >{`${convertTime(start)} - ${convertTime(end)} ${hasF2F ? `(${modalities[i]})` : ''}`}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => {
      const room = row.rooms.filter((room) => room !== '');

      if (room.length === 0) return 'N/A';

      return room[0];
    },
    header: 'Room',
    id: 'room',
  },
  {
    accessorKey: 'restriction',
    header: 'Restriction/s',
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
  },
];
