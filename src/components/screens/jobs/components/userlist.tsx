"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { User } from "@/models/users";

type SelectedUsersState = {
  [key: number]: User[];
};

type UserListProps = {
  setOpen: (open: boolean) => void;
  setSelectedUsers: React.Dispatch<React.SetStateAction<SelectedUsersState>>;
  setCheckedUsers: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  checkedUsers: { [key: string]: boolean };
  index: number;
  users: User[];
};

export function UserList({
  setOpen,
  setSelectedUsers,
  setCheckedUsers,
  checkedUsers,
  index,
  users,
}: UserListProps) {
  const [localSelectedUsers, setLocalSelectedUsers] = useState<User[]>([]);

  const handleUserCheckboxChange = (user: User) => {
    setCheckedUsers((prev) => ({
      ...prev,
      [user.id]: !prev[user.id],
    }));

    setLocalSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {users.map((user) => (
            <CommandItem key={user.id} id={user.id}>
              <Checkbox
                id={`user-checkbox-${user.id}`}
                checked={checkedUsers[user.id] || false}
                onCheckedChange={() => handleUserCheckboxChange(user)}
                className="mr-2"
              />
              {user.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <Button
        onClick={() => {
          setSelectedUsers((prev: SelectedUsersState) => ({
            ...prev,
            [index]: localSelectedUsers,
          }));
          setOpen(false);
        }}
      >
        Done
      </Button>
    </Command>
  );
}
