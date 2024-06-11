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
import { useRouter } from 'next/navigation';

const MOCK_TARGET_LANGUAGES = [
  {
    id: "en",
    name: "English",
    user: [
      {
        id: "9e722f34-798d-43a8-ac78-e8fbc8fc4d5c",
        name: "Phung Lam",
        username: "lamphung",
        email: "lamphung@email.com",
        role: "Linguist",
        status: "Active",
      },
      {
        id: "9e722f34-798d-43a8-ac78-e8fbc8fc4d6c",
        name: "Le Nguyen",
        username: "nguyenle",
        email: "nguyenle@email.com",
        role: "Linguist",
        status: "Active",
      },
      {
        id: "9e722f34-798d-43a8-ac78-e8fbc8fc4d7c",
        name: "Phan Truong",
        username: "hommet",
        email: "hommet@email.com",
        role: "Linguist",
        status: "Active",
      },
    ],
  },
  {
    id: "fr",
    name: "French",
    user: [
      {
        id: "9e722f34-798d-43a8-ac78-e8fbc8fc4d5c",
        name: "Thien Phuoc",
        username: "thienphuoc",
        email: "thienphuoc@email.com",
        role: "Linguist",
        status: "Active",
      },
      {
        id: "9e722f34-798d-43a8-ac78-e8fbc8fc4d6c",
        name: "Tran Huy",
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
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!validTypes.includes(file.type)) {
        return false;
      }

      if (file.size > maxSize) {
        return false;
      }

      return true;
    },
    {
      message:
        "Invalid file. Only JPEG, PNG, and PDF files under 5MB are allowed.",
    }
  ),
  target_languages: z.array(z.any()),
  duedate: z.date(),
});

type SelectedUsersState = {
  [key: number]: User[];
};

export function CreateJobScreen() {
  const [targetLanguages, setTargetLanguages] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [selectedUsers, setSelectedUsers] = useState<SelectedUsersState>({});
  const [openPopovers, setOpenPopovers] = useState<boolean[]>([]);
  const [checkedUsers, setCheckedUsers] = useState<{ [key: string]: boolean }>(
    {}
  );
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching target languages from API
    setTargetLanguages(MOCK_TARGET_LANGUAGES);
    // Initialize checked states and openPopovers states
    setCheckedStates(
      MOCK_TARGET_LANGUAGES.reduce((acc, _, index) => {
        acc[index] = false;
        return acc;
      }, {})
    );
    setOpenPopovers(MOCK_TARGET_LANGUAGES.map(() => false));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: undefined,
      duedate: new Date(),
    },
  });

  const handleCheckboxChange = (index: number) => {
    setCheckedStates((prev) => {
      const newCheckedStates = {
        ...prev,
        [index]: !prev[index],
      };

      const checkedLanguages = targetLanguages.filter(
        (_, i) => newCheckedStates[i]
      );
      form.setValue("target_languages", checkedLanguages);

      return newCheckedStates;
    });
  };

  const handlePopoverToggle = (index: number, isOpen: boolean) => {
    setOpenPopovers((prev) => {
      const newOpenPopovers = [...prev];
      newOpenPopovers[index] = isOpen;
      return newOpenPopovers;
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const userIds = Object.values(selectedUsers)
      .flat()
      .map((user) => user.id);
    const payload = {
      userIds,
      name: data.file.name.split(".")[0],
      targetLanguageId: data.target_languages[0].id,
      projectId: 1, // replace with actual project id
      dueDate: format(data.duedate, "yyyy-MM-dd"),
      fileExtention: `.${data.file.name.split(".").pop()}`,
      status: "new",
    };

    const response = await fetch("http://localhost:9999/jobs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    window.alert('Request was successful!');
    router.push('/jobs');
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
                  accept=".jpg, .jpeg, .png, .pdf"
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
                  id={`target_languages[${index}].name`}
                  className="mr-3"
                  checked={checkedStates[index]}
                  onCheckedChange={() => handleCheckboxChange(index)}
                />
                <FormLabel>{language.name}</FormLabel>
                <FormControl>
                  <Popover
                    open={openPopovers[index]}
                    onOpenChange={(isOpen) =>
                      handlePopoverToggle(index, isOpen)
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start ml-3"
                        disabled={!checkedStates[index]}
                      >
                        {selectedUsers[index] ? (
                          selectedUsers[index]
                            .map((user) => user.name)
                            .join(", ")
                        ) : (
                          <>Choose linguists</>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <UserList
                        setOpen={(isOpen) => handlePopoverToggle(index, isOpen)}
                        initialSelectedUsers={selectedUsers[index]}
                        setSelectedUsers={setSelectedUsers}
                        setCheckedUsers={setCheckedUsers}
                        checkedUsers={checkedUsers}
                        index={index}
                        users={language.user}
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
