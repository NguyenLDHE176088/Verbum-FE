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

type UserNameInfo = {
  id: string;
  firstName: string;
  lastName: string;
};

type UserListProps = {
  users: UserNameInfo[];
  selectedUsers: UserNameInfo[]; // Consider changing this prop to a single UserNameInfo object or null for consistency.
  onUserSelection: (selectedUsers: UserNameInfo[]) => void;
};

export function UserList({
  users,
  selectedUsers,
  onUserSelection,
}: UserListProps) {
  const [internalSelectedUser, setInternalSelectedUser] =
    useState<UserNameInfo | null>(selectedUsers[0] || null);

  useEffect(() => {
    onUserSelection(internalSelectedUser ? [internalSelectedUser] : []);
  }, []);

  useEffect(() => {
    setInternalSelectedUser(selectedUsers[0] || null);
  }, [selectedUsers]);

  const handleCheckboxChange = (user: UserNameInfo) => {
    setInternalSelectedUser((prev) => {
      if (prev?.id === user.id) {
        onUserSelection([]);
        return null;
      } else {
        onUserSelection([user]);
        return user;
      }
    });
  };

  return (
    <Command>
      <CommandInput placeholder="Filter Users..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {users.map((user) => (
            <CommandItem
              key={user.id}
              disabled={
                internalSelectedUser !== null &&
                internalSelectedUser.id !== user.id
              }
            >
              <Checkbox
                className="mr-3"
                checked={internalSelectedUser?.id === user.id}
                onCheckedChange={() => handleCheckboxChange(user)}
              />
              {user.firstName} {user.lastName}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
