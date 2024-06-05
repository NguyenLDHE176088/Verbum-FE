import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/models/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
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
    accessorKey: "id",
    header: ({ column }) => {
      return <div className="text-center w-[50px]">#</div>;
    },
    cell: ({ row }) => <div className="text-center w-[50px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div>Name</div>;
    },
    cell: ({ row }) => <div className="truncate">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <div>Username</div>;
    },
    cell: ({ row }) => <div className="truncate">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <div>Email</div>;
    },
    cell: ({ row }) => <div className="truncate">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <div className="">Role</div>;
    },
    cell: ({ row }) => <div className="max-w-17">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div>Status</div>;
    },
    cell: ({ row }) => <div className="max-w-12">{row.getValue("status")}</div>,
  },
];
