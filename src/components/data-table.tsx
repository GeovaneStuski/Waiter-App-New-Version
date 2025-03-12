'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: Props<TData>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  return (
    <div className='border border-zinc-200 rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(header => (
            <TableRow className='bg-zinc-100 h-[52px]' key={header.id} >
              {header.headers.map(header => (
                <TableHead className='text-gray-700' style={{ width: `${header.getSize()}px` }} key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow className='bg-white' key={row.id}>
              {row.getAllCells().map(cell => (
                <TableCell style={{ width: `${cell.column.getSize()}px` }} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}