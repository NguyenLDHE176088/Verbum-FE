"use client";
import React, { useEffect, useState } from "react";
import { Language } from "@/models/languages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "@/data/users";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/user/create/components/combobox";
import { Permissions } from "./Permissions";
import LanguageSelector from "./languageSelector";
import { useRouter } from "next/navigation";
import { getUserIdFromCookie } from "@/lib/auth";

interface CreateUserProps {
  languages: Language[];
  setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

export const Form: React.FC<CreateUserProps> = ({
  languages,
  setLanguages,
}) => {
  const router = useRouter();
  const [creatorId, setCreatorId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roleName, setRoleName] = useState<string>("");
  const [allowRejectJob, setAllowRejectJob] = useState<boolean>(false);
  const [allowManageJobs, setAllowManageJobs] = useState<boolean>(false);
  const [allowManageUsers, setAllowManageUsers] = useState<boolean>(false);
  const [allowManageTermBase, setAllowManageTermBase] =
    useState<boolean>(false);
  const [allowViewAllProject, setAllowViewAllProject] =
    useState<boolean>(false);
  const [status] = useState<string>("active");
  const [selectedSourceLanguages, setSelectedSourceLanguages] = useState<
    string[]
  >([]);
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState<
    string[]
  >([]);

  async function getCreatorId() {
    const result = await getUserIdFromCookie();
    setCreatorId(result);
  }

  useEffect(() => {
    getCreatorId();
  }, []);
  const handleRoleChange = (role: string) => {
    setRoleName(role);
    setSelectedSourceLanguages([]);
    setSelectedTargetLanguages([]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const joinDate = new Date();
    const payload = {
      creatorId,
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
      joinDate,
      LanguageUser: [
        ...selectedSourceLanguages.map((languageCode) => ({
          languageCode,
          type: "source_language",
        })),
        ...selectedTargetLanguages.map((languageCode) => ({
          languageCode,
          type: "target_language",
        })),
      ],
    };

    console.log("Form Submitted", payload);
    createUser(payload);
    window.location.href = "/users";
  };

  return (
    <div className="w-full max-w-md border rounded-md">
      <form className="flex flex-col space-y-4 p-5" onSubmit={handleSubmit}>
        <Label>
          <span className="text-md font-semibold">First Name</span>
          <Input
            type="text"
            placeholder="Enter firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Label>
        <Label>
          <span className="text-md font-semibold">Last Name</span>
          <Input
            type="text"
            placeholder="Enter lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Label>
        <Label>
          <span className="text-md font-semibold">Username</span>
          <Input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Label>
        <Label>
          <span className="text-md font-semibold">Email</span>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        <Combobox value={roleName} onChange={handleRoleChange} />
        {roleName && (
          <Permissions
            roleName={roleName}
            allowRejectJob={allowRejectJob}
            setAllowRejectJob={setAllowRejectJob}
            allowManageJobs={allowManageJobs}
            setAllowManageJobs={setAllowManageJobs}
            allowManageUsers={allowManageUsers}
            setAllowManageUsers={setAllowManageUsers}
            allowManageTermBase={allowManageTermBase}
            setAllowManageTermBase={setAllowManageTermBase}
          />
        )}
        {roleName === "Linguist" && (
          <div className="flex flex-col space-y-2 pt-2">
            <Label>
              <span className="text-md font-semibold">Source Language</span>
              <LanguageSelector
                languages={languages}
                selectedLanguages={selectedSourceLanguages}
                setSelectedLanguages={setSelectedSourceLanguages}
                type="source"
              />
            </Label>
            <Label>
              <span className="text-md font-semibold">Target Language</span>
              <LanguageSelector
                languages={languages}
                selectedLanguages={selectedTargetLanguages}
                setSelectedLanguages={setSelectedTargetLanguages}
                type="target"
              />
            </Label>
          </div>
        )}
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};
