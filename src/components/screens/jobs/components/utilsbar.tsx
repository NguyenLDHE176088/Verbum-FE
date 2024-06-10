"use client";

import * as React from "react";
import { Trash2, Pencil, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

interface UtilsBarProps {
  table: any;
  rowSelection: any;
}

const UtilsBar: React.FC<UtilsBarProps> = ({ table, rowSelection }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between gap-5 py-4">
      <div className="flex gap-5">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Enter file name..."
            value={
              (table.getColumn("filename")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("filename")?.setFilterValue(event.target.value)
            }
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] rounded-full"
          />
        </div>
        <Button
          className="text-[#5880CE] font-bold rounded-full"
          variant="outline"
          size="sm"
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Pencil color="#5880CE" />
          Edit
        </Button>
        <Button
          className="text-[#EB3223] font-bold rounded-full"
          variant="outline"
          size="sm"
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Trash2 color="#EB3223" />
          Delete
        </Button>
      </div>
      <Button
        className="bg-[#FF9300]"
        variant="outline"
        size="icon"
        onClick={() => router.push("/jobs/create")}
      >
        <Plus className="h-4 w-4" color="white" />
      </Button>
    </div>
  );
};

export default UtilsBar;
