import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Job } from "@/models/jobs";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const columns: ColumnDef<Job>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const formattedDate = format(new Date(date), "dd/MM/yyyy");
      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "sourceLanguage",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Source
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("sourceLanguage")}</div>
    ),
  },
  {
    accessorKey: "targetLanguageId",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Target
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center uppercase">
        {row.getValue("targetLanguageId")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            File name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "pname",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pname")}</div>
    ),
  },
  // {
  //   accessorKey: "words",
  //   header: ({ column }) => {
  //     return (
  //       <div className="text-center">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Words
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => (
  //     <div className="text-center">{row.getValue("words")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "provider",
  //   header: ({ column }) => {
  //     return (
  //       <div className="text-center">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Provider
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => (
  //     <div className="text-center">{row.getValue("provider")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "progress",
  //   header: ({ column }) => {
  //     return (
  //       <div className="text-center">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Progress
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => (
  //     <div className="text-center">{row.getValue("progress")}</div>
  //   ),
  // },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as string;
      const formattedDate = format(new Date(date), "dd/MM/yyyy");
      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center uppercase">{row.getValue("status")}</div>
    ),
  },
];
