"use client";

import * as React from "react";
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Job } from "@/models/jobs";
import { columns } from "./components/columns";
import UtilsBar from "./components/utilsbar";

const data: Job[] = [
  {
    id: "1",
    created_date: "2021-06-01",
    source_language: "English",
    target_language: "Spanish",
    filename: "document1.pdf",
    project: "Project Alpha",
    words: 1500,
    provider: "Provider A",
    progress: 50,
    due_date: "2024-06-01",
    status: "in_progress",
  },
  {
    id: "2",
    created_date: "2021-06-02",
    source_language: "French",
    target_language: "German",
    filename: "document2.docx",
    project: "Project Beta",
    words: 2500,
    provider: "Provider B",
    progress: 100,
    due_date: "2024-05-25",
    status: "completed",
  },
  {
    id: "3",
    created_date: "2021-06-03",
    source_language: "Japanese",
    target_language: "English",
    filename: "document3.txt",
    project: "Project Gamma",
    words: 3000,
    provider: "Provider C",
    progress: 20,
    due_date: "2024-06-10",
    status: "in_progress",
  },
  {
    id: "4",
    created_date: "2021-06-04",
    source_language: "Spanish",
    target_language: "Portuguese",
    filename: "document4.pdf",
    project: "Project Delta",
    words: 1200,
    provider: "Provider D",
    progress: 0,
    due_date: "2024-06-05",
    status: "new",
  },
  {
    id: "5",
    created_date: "2021-06-05",
    source_language: "Chinese",
    target_language: "Korean",
    filename: "document5.docx",
    project: "Project Epsilon",
    words: 1800,
    provider: "Provider E",
    progress: 75,
    due_date: "2024-05-30",
    status: "in_progress",
  },
  {
    id: "6",
    created_date: "2021-06-06",
    source_language: "Russian",
    target_language: "English",
    filename: "document6.txt",
    project: "Project Zeta",
    words: 2200,
    provider: "Provider F",
    progress: 100,
    due_date: "2024-05-20",
    status: "completed",
  },
  {
    id: "7",
    created_date: "2021-06-07",
    source_language: "Italian",
    target_language: "French",
    filename: "document7.pdf",
    project: "Project Eta",
    words: 900,
    provider: "Provider G",
    progress: 50,
    due_date: "2024-06-02",
    status: "in_progress",
  },
  {
    id: "8",
    created_date: "2021-06-08",
    source_language: "German",
    target_language: "English",
    filename: "document8.docx",
    project: "Project Theta",
    words: 1600,
    provider: "Provider H",
    progress: 100,
    due_date: "2024-05-15",
    status: "overdue",
  },
  {
    id: "9",
    created_date: "2021-06-09",
    source_language: "Portuguese",
    target_language: "Spanish",
    filename: "document9.txt",
    project: "Project Iota",
    words: 1400,
    provider: "Provider I",
    progress: 10,
    due_date: "2024-06-08",
    status: "in_progress",
  },
  {
    id: "10",
    created_date: "2021-06-10",
    source_language: "Arabic",
    target_language: "English",
    filename: "document10.pdf",
    project: "Project Kappa",
    words: 2100,
    provider: "Provider J",
    progress: 0,
    due_date: "2024-06-15",
    status: "new",
  },
];

export function JobsScreen() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-2 border-solid border-2 rounded-lg">
      <UtilsBar table={table} rowSelection={rowSelection} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
