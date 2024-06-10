"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/user/create/components/combobox";
import { MainLayout } from "@/components/layouts/MainLayout";
import Head from "next/head";

interface PermissionMap {
  [key: string]: string[];
}

const permissionsByRole: PermissionMap = {
  "Project Manager": ["Manage Projects", "Assign Tasks", "Review Work"],
  Linguist: ["Translate Text", "Review Translations", "Manage Glossaries"],
  Guest: ["View Projects"],
};

interface Payload {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  roleName: string;
  permissions: string[];
  allowRejectJob: boolean;
  status: string;
  LanguageUser: {
    langugeCode: string;
    type: string;
  }[];
}

export default function CreateUser() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [allowRejectJob, setAllowRejectJob] = useState<boolean>(false); // Default to false as per the payload
  const [status] = useState<string>("active"); // Default to active as per the payload
  const [sourceLanguageCode, setSourceLanguageCode] = useState<string>("EN"); // Default to EN
  const [targetLanguageCode, setTargetLanguageCode] = useState<string>(""); // No default

  const handleRoleChange = (role: string) => {
    setRoleName(role);
    setPermissions([]); // Reset permissions when role changes
  };

  const handlePermissionChange = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: Payload = {
      firstName,
      lastName,
      userName,
      email,
      roleName,
      permissions,
      allowRejectJob,
      status,
      LanguageUser: [
        { langugeCode: sourceLanguageCode, type: "source_language" },
        { langugeCode: targetLanguageCode, type: "target_language" },
      ],
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
              {roleName === "Linguist" && (
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={allowRejectJob}
                      onChange={() => setAllowRejectJob(!allowRejectJob)}
                    />
                    <span>Allow Reject Job</span>
                  </label>
                  <div className="flex flex-col space-y-2">
                    <label className="flex flex-col space-y-2">
                      <span>Source Language</span>
                      <Input
                        type="text"
                        placeholder="Enter source language code"
                        value={sourceLanguageCode}
                        onChange={(e) => setSourceLanguageCode(e.target.value)}
                      />
                    </label>
                    <label className="flex flex-col space-y-2">
                      <span>Target Language</span>
                      <Input
                        type="text"
                        placeholder="Enter target language code"
                        value={targetLanguageCode}
                        onChange={(e) => setTargetLanguageCode(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              )}
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
              <Button type="submit">Create</Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
