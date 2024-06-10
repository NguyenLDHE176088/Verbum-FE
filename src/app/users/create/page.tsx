"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/user/create/components/combobox";
import { MainLayout } from "@/components/layouts/MainLayout";
import Head from "next/head";

const permissionsByRole = {
  "Project Manager": ["Manage Projects", "Assign Tasks", "Review Work"],
  Linguist: ["Translate Text", "Review Translations", "Manage Glossaries"],
  Guest: ["View Projects"],
};

export default function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [allowRejectJob, setAllowRejectJob] = useState(false); // Default to false as per the payload
  const [status] = useState("active"); // Default to active as per the payload
  const [languageCode] = useState("EN"); // Default to EN
  const [languageType] = useState("source_language"); // Default to source_language

  const handleRoleChange = (role) => {
    setRoleName(role);
    setPermissions([]); // Reset permissions when role changes
  };

  const handlePermissionChange = (permission: any) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      firstName,
      lastName,
      userName,
      email,
      roleName,
      permissions,
      allowRejectJob,
      status,
      LanguageUser: [{ languageCode: languageCode, type: languageType }],
    };

    console.log("Form Submitted", payload);
    // Add logic to send this payload to your backend here
  };

  return (
    <MainLayout>
      <Head>
        <title>Create User</title>
      </Head>
      <div className="flex flex-col overflow-hidden">
        <span className="w-full pt-6 pb-3">
          <p className="ml-4 text-3xl font-bold text-black">Create User</p>
        </span>
        <div className="flex flex-col w-full">
          <div className="w-full max-w-md border rounded-md">
            <form
              className="flex flex-col space-y-4 p-5"
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                placeholder="Enter firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Enter lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Combobox value={roleName} onChange={handleRoleChange} />
              {roleName && (
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Select Permissions</p>
                  {permissionsByRole[roleName].map((permission) => (
                    <label
                      key={permission}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        checked={permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                      />
                      <span>{permission}</span>
                    </label>
                  ))}
                </div>
              )}
              {roleName === "Linguist" ? (
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={allowRejectJob}
                    onChange={() => setAllowRejectJob(!allowRejectJob)}
                  />
                  <span>Allow Reject Job</span>
                </label>
              ) : null}

              <Button type="submit">Create</Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
