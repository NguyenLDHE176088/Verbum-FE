"use client";
import { User } from "@/models/users";
import { getUser, updateUser } from "@/data/users";
import { Input } from "@/components/ui/input";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function EditUser() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = React.useState<User | null>(null);
  // const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof id === "string") {
      const fetchData = async () => {
        try {
          const result = await getUser(id);
          if (result.success) {
            setUser(result.success);
          } else {
            setError("User not found");
          }
        } catch (err) {
          setError("Failed to fetch user");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof id === "string") {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const body = Object.fromEntries(formData.entries());

      try {
        const result = await updateUser(id, body);
        if (result.success) {
          alert("User updated successfully!");
          router.push("/users"); // Navigate to user list or detail page after successful update
        } else {
          alert("Failed to update user");
        }
      } catch (err) {
        alert("An error occurred while updating the user");
      }
    } else {
      alert("Invalid user ID");
    }
  };

  return (
    <>
      {id && user && id === user.id && (
        <div className="flex flex-col overflow-hidden">
          <div className="w-full max-w-md border rounded-md">
            <form onSubmit={handleSave} className="flex flex-col space-y-4 p-5">
              <Label>
                Email
                <Input
                  type="email"
                  placeholder="Enter email"
                  required
                  name="email"
                  defaultValue={user?.email}
                />
              </Label>
              <Label>
                First Name
                <Input
                  type="text"
                  placeholder="Enter firstname"
                  required
                  name="firstname"
                  defaultValue={user?.firstName}
                />
              </Label>
              <Label>
                Last Name
                <Input
                  type="text"
                  placeholder="Enter lastname"
                  required
                  name="lastname"
                  defaultValue={user?.lastName}
                />
              </Label>
              {user.roleName && user.roleName == "LINGUIST" && (
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={user?.allowRejectJob}
                      onChange={() =>
                        setUser({
                          ...user,
                          allowRejectJob: !user.allowRejectJob,
                        })
                      }
                    />
                    <span>Allow Reject Job</span>
                  </label>
                </div>
              )}
              <Button type="submit">Save</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
