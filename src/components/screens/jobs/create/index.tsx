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
  FormDescription,
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
import { User } from "@/models/users";
import { useRouter } from "next/navigation";
import app from "@/lib/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const MOCK_TARGET_LANGUAGES = [
  {
    id: "EN",
    name: "English",
    user: [
      {
        id: "clxm7toie0000ikgq1wf2nkyj",
        firstName: "Phuc Lam",
        lastName: "Phung",
        username: "lamphung",
        email: "lamphung@email.com",
        role: "Linguist",
        status: "Active",
      },
      {
        id: "clxm7toie0001ikgq1wf2nkyj",
        firstName: "Dai Nguyen",
        lastName: "Le",
        username: "nguyenle",
        email: "nguyenle@email.com",
        role: "Linguist",
        status: "Active",
      },
      {
        id: "clxm7toie0004ikgq1wf2nkyj",
        firstName: "Dang Truong",
        lastName: "Phan",
        username: "hommet",
        email: "hommet@email.com",
        role: "Linguist",
        status: "Active",
      },
    ],
  },
  {
    id: "FR",
    name: "French",
    user: [
      {
        id: "clxm7toie0002ikgq1wf2nkyj",
        firstName: "Thien Phuoc",
        lastName: "Duong",
        username: "thienphuoc",
        email: "thienphuoc@email.com",
        role: "Linguist",
        status: "Active",
      },
      {
        id: "clxm7toie0003ikgq1wf2nkyj",
        firstname: "Quang Huy",
        lastName: "Tran",
        username: "tranhuy",
        email: "tranhuy@email.com",
        role: "Linguist",
        status: "Active",
      },
    ],
  },
];

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

export function CreateJobScreen() {
  const [targetLanguages, setTargetLanguages] = useState([]);
  const [checkedLanguages, setCheckedLanguages] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching target languages from API
    setTargetLanguages(MOCK_TARGET_LANGUAGES);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: undefined,
      duedate: new Date(),
    },
  });

  const handleCheckboxChange = (id) => {
    setCheckedLanguages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUserSelection = (languageId, users) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [languageId]: users,
    }));
  };

  const onSubmit = async (data) => {
    const jobsPayload = [];
    const storage = getStorage(app);

    const storageRef = ref(storage, data.file.name);

    // 'file' comes from the Blob or File API
    const file = data.file; // replace with your file input's name attribute

    const metadata = {
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
          targetLanguageId: languageId,
          projectId: 1, // replace with actual project id
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
        {targetLanguages.map((language, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`target_languages[${index}].name` as any}
            render={() => (
              <FormItem>
                <Checkbox
                  className="mr-3"
                  checked={!!checkedLanguages[language.id]}
                  onCheckedChange={() => handleCheckboxChange(language.id)}
                />
                <FormLabel>{language.name}</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start ml-3"
                        disabled={!checkedLanguages[language.id]}
                      >
                        {selectedUsers[language.id]?.length > 0
                          ? `${selectedUsers[language.id]
                              .map(
                                (user) => user.lastName + " " + user.firstName
                              )
                              .join(", ")}`
                          : "Choose linguists"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <UserList
                        users={language.user}
                        selectedUsers={selectedUsers[language.id] || []}
                        onUserSelection={(users) =>
                          handleUserSelection(language.id, users)
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
