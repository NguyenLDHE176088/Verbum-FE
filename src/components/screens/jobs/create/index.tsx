"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { UserList } from "../components/userlist";
import { useRouter } from "next/navigation";
import app from "@/lib/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getUserIdFromCookie } from "@/lib/auth";
import { Language } from "@/models/languages";

const FormSchema = z.object({
  file: z.custom(
    (file) => {
      if (!(file instanceof File)) {
        return false;
      }
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        return false;
      }

      if (file.size > maxSize) {
        return false;
      }

      return true;
    },
    {
      message: "Invalid file. Only DOCX files under 5MB are allowed.",
    }
  ),
  target_languages: z.array(z.any()),
  duedate: z.date(),
});


export function CreateJobScreen({projectId}) {
  const [userId, setUserId] = useState<string>();
  const [userCompany, setUserCompany] = useState<string>();
  const [projectSourceLanguage, setProjectSourceLanguage] =
    useState<Language>();
  const [projectTargetLanguages, setProjectTargetLanguages] = useState([]);
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState([]);
  const [checkedLanguages, setCheckedLanguages] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const router = useRouter();

  const getUserId = async () => {
    const response = await getUserIdFromCookie();
    setUserId(response);
    return response;
  };

  const fetchUserCompany = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:9999/company/find-by-user-id?userId=${userId}`
      );
      const data = await response.json();
      setUserCompany(data.companyId);
    } catch (error) {
      console.error("Error fetching user company:", error);
    }
  };

  const fetchProjectSourceLanguage = async (projectId: string) => {
    try {
      const response = await fetch(
        `http://localhost:9999/languages/source-language?projectId=${projectId}`
      );
      const data = await response.json();
      setProjectSourceLanguage(data.language);
    } catch (error) {
      console.error("Error fetching project source language:", error);
    }
  };

  const fetchProjectTargetLanguages = async (projectId: string) => {
    try {
      const response = await fetch(
        `http://localhost:9999/languages/target-language?projectId=${projectId}`
      );
      const data = await response.json();
      setProjectTargetLanguages(data);
    } catch (error) {
      console.error("Error fetching project target languages:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const userId = await getUserId();
      if (userId) {
        await fetchUserCompany(userId);
      }
      if (projectId) {
        await Promise.all([
          fetchProjectSourceLanguage(projectId as string),
          fetchProjectTargetLanguages(projectId as string),
        ]);
      }
    };

    initialize();
  }, [projectId]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: undefined,
      duedate: new Date(),
    },
  });

  const handleCheckboxChange = async (id) => {
    console.log("id", id);
    console.log("sourceLanguage", projectSourceLanguage);
    // Toggle the checkbox state
    setCheckedLanguages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (!checkedLanguages[id]) {
      try {
        const response = await fetch(
          `http://localhost:9999/jobs/find-by-source-target-language?companyId=${userCompany}&sourceLanguageCode=${projectSourceLanguage.code}&targetLanguageCode=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch target languages");
        }

        const data = await response.json();
        console.log("data", data);

        // Add the fetched language to selectedTargetLanguages
        setSelectedTargetLanguages((prev) => [...prev, data]);
      } catch (error) {
        console.error("Error fetching target languages:", error);
      }
    } else {
      // Remove the language from selectedTargetLanguages if the checkbox is unchecked
      setSelectedTargetLanguages((prev) =>
        prev.filter((lang) => lang.code !== id)
      );
    }
  };

  console.log("selectedTargetLanguages", selectedTargetLanguages);

  const handleUserSelection = (code, users) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [code]: users,
    }));
  };

  const onSubmit = async (data) => {
    const jobsPayload = [];
    const storage = getStorage(app);

    const storageRef = ref(storage, data.file.name);

    const file = data.file;

    const metadata = {
      contentType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };

    // Upload the file to the path 'some-child'
    const snapshot = await uploadBytes(storageRef, file, metadata);

    console.log("Uploaded a blob or file!", snapshot);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    console.log(JSON.stringify(jobsPayload));

    Object.keys(checkedLanguages).forEach((languageId) => {
      if (checkedLanguages[languageId]) {
        const jobPayload = {
          userIds: selectedUsers[languageId]?.map((user) => user.id) || [],
          name: data.file.name.split(".")[0],
          projectId: parseInt(projectId),
          targetLanguageId: languageId,
          dueDate: format(data.duedate, "yyyy-MM-dd"),
          fileExtention: `.${data.file.name.split(".").pop()}`,
          status: "new",
          documentUrl: downloadURL,
        };

        jobsPayload.push(jobPayload);
      }
    });
    const response = await fetch("http://localhost:9999/jobs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobsPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    window.alert("Request was successful!");
    router.push("/jobs");
  };

  if (!userCompany || !projectSourceLanguage || !projectTargetLanguages) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".docx"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {projectTargetLanguages.map((language, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`target_languages[${index}].name` as any}
            render={() => (
              <FormItem>
                <Checkbox
                  className="mr-3"
                  checked={!!checkedLanguages[language.code]}
                  onCheckedChange={() => handleCheckboxChange(language.code)}
                />
                <FormLabel>{language.name}</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start ml-3"
                        disabled={!checkedLanguages[language.code]}
                      >
                        {selectedUsers[language.code]?.length > 0
                          ? `${selectedUsers[language.code]
                              .map(
                                (user) => user.lastName + " " + user.firstName
                              )
                              .join(", ")}`
                          : "Choose linguists"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <UserList
                        users={
                          selectedTargetLanguages.find(
                            (lang) => lang.code === language.code
                          )?.users || []
                        }
                        selectedUsers={selectedUsers[language.code] || []}
                        onUserSelection={(users) =>
                          handleUserSelection(language.code, users)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="duedate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
