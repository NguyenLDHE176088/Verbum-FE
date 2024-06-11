"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/user/create/components/combobox";
import { MainLayout } from "@/components/layouts/MainLayout";
import Head from "next/head";
import { createUser } from "@/data/users";

interface Payload {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  roleName: string;
  allowRejectJob: boolean;
  allowManageJobs: boolean;
  allowManageUsers: boolean;
  allowManageTermBase: boolean;
  allowViewAllProject: boolean;
  status: string;
  LanguageUser: {
    languageCode: string;
    type: string;
  }[];
}

export default function CreateUser() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [allowRejectJob, setAllowRejectJob] = useState<boolean>(false); // Default to false as per the payload
  const [allowManageJobs, setAllowManageJobs] = useState<boolean>(false); // Default to false as per the payload
  const [allowManageUsers, setAllowManageUsers] = useState<boolean>(false); // Default to false as per the payload
  const [allowManageTermBase, setAllowManageTermBase] =
    useState<boolean>(false); // Default to false as per the payload
  const [allowViewAllProject, setAllowViewAllProject] =
    useState<boolean>(false); // Default to false as per the payload
  const [status] = useState<string>("active"); // Default to active as per the payload
  const [sourceLanguageCode, setSourceLanguageCode] = useState<string>(""); // Default to EN
  const [targetLanguageCode, setTargetLanguageCode] = useState<string>(""); // No default

  const handleRoleChange = (role: string) => {
    setRoleName(role);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: Payload = {
      firstName,
      lastName,
      userName,
      email,
      roleName,
      allowRejectJob,
      allowManageJobs,
      allowManageUsers,
      allowManageTermBase,
      allowViewAllProject,
      status,
      LanguageUser: [
        { languageCode: sourceLanguageCode, type: "source_language" },
        { languageCode: targetLanguageCode, type: "target_language" },
      ],
    };

    console.log("Form Submitted", payload);
    // Add logic to send this payload to your backend here
    createUser(payload);
  };

  return (
    <MainLayout>
      <div className="flex flex-col overflow-hidden">
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
                required
              />
              <Input
                type="text"
                placeholder="Enter lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Combobox value={roleName} onChange={handleRoleChange} />
              {roleName && (
                <>
                  <span className="text-lg font-bold">Permissions</span>
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
                            onChange={(e) =>
                              setSourceLanguageCode(e.target.value)
                            }
                            required
                          />
                        </label>
                        <label className="flex flex-col space-y-2">
                          <span>Target Language</span>
                          <Input
                            type="text"
                            placeholder="Enter target language code"
                            value={targetLanguageCode}
                            onChange={(e) =>
                              setTargetLanguageCode(e.target.value)
                            }
                            required
                          />
                        </label>
                      </div>
                    </div>
                  )}
                  {roleName == "Project Manager" && (
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={allowManageJobs}
                          onChange={() => setAllowManageJobs(!allowManageJobs)}
                        />
                        <span>Allow Manage Jobs</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={allowManageUsers}
                          onChange={() =>
                            setAllowManageUsers(!allowManageUsers)
                          }
                        />
                        <span>Allow Manage Users</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={allowManageTermBase}
                          onChange={() =>
                            setAllowManageTermBase(!allowManageTermBase)
                          }
                        />
                        <span>Allow Manage Termbase</span>
                      </label>
                    </div>
                  )}
                </>
              )}
              <Button type="submit">Create</Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
