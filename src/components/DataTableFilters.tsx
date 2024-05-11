'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter';
import { X } from 'lucide-react';
import { Modality } from '@prisma/client';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableFilters<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const modalities = Object.values(Modality).map((modality) => {
    return {
      label: modality.replaceAll('_', ' '),
      value: modality,
    };
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter professors..."
          value={
            (table.getColumn('professor')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('professor')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('modality') && (
          <DataTableFacetedFilter
            column={table.getColumn('modality')}
            title="Modality"
            options={modalities}
          />
        )}
        {/* {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
