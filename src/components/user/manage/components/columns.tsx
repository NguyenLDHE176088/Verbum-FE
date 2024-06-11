import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/models/users";
import { ColumnDef } from "@tanstack/react-table";

// Utility function to convert text to sentence case
function toSentenceCase(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "order",
    header: "#",
    cell: ({ row }) => {
      const index = row.index + 1; // Calculate the row index
      return <div>{index}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="truncate">{`${row.original.firstName} ${row.original.lastName}`}</div>
    ),
  },
  {
    accessorKey: "userName",
    header: "Username",
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("userName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="truncate">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "roleName",
    header: "Role",
    cell: ({ row }) => (
      <div className="max-w-17">{toSentenceCase(row.getValue("roleName"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="max-w-12">{toSentenceCase(row.getValue("status"))}</div>
    ),
  },
];
