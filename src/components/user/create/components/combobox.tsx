"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const roles = [
  {
    value: "Project Manager",
    label: "Project Manager",
  },
  {
    value: "Linguist",
    label: "Linguist",
  },
  {
    value: "Guest",
    label: "Guest",
  },
];

export function Combobox({ value, onChange }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          aria-required="true"
        >
          {value
            ? roles.find((role) => role.value === value)?.label
            : "Select role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[28.125rem] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === role.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {role.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
