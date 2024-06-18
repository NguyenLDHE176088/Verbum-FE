"use client";

import { useEffect, useState } from "react";
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

type UserListProps = {
  users: User[];
  selectedUsers: User[];
  onUserSelection: (selectedUsers: User[]) => void;
};

export function UserList({ users, selectedUsers, onUserSelection }: UserListProps) {
  const [internalSelectedUsers, setInternalSelectedUsers] =
    useState<User[]>(selectedUsers);

  useEffect(() => {
    onUserSelection(internalSelectedUsers);
  }, []);

  useEffect(() => {
    setInternalSelectedUsers(selectedUsers);
  }, [selectedUsers]);

  const handleCheckboxChange = (user: User) => {
    setInternalSelectedUsers((prev) =>
      prev.includes(user)
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
            <CommandItem key={user.id}>
              <Checkbox 
                className="mr-3"
                checked={internalSelectedUsers.includes(user)}
                onCheckedChange={() => handleCheckboxChange(user)}
              />
              {user.firstName} {user.lastName}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <Button onClick={() => onUserSelection(internalSelectedUsers)}>Done</Button>
    </Command>
  );
}
