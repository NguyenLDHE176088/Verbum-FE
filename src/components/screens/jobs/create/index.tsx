"use client"

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
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { UserList } from "../components/userlist";

const MOCK_TARGET_LANGUAGES = [
  {
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
    name: "Spanish",
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
  file: z.any(),
  target_languages: z.array(z.string()),
  duedate: z.date(),
});

type User = {
  id: string;
  name: string;
};

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
    setOpenPopovers(
      MOCK_TARGET_LANGUAGES.map(() => false)
    );
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: undefined,
      duedate: new Date(),
    },
  });

  const handleCheckboxChange = (index: number) => {
    setCheckedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePopoverToggle = (index: number, isOpen: boolean) => {
    setOpenPopovers((prev) => {
      const newOpenPopovers = [...prev];
      newOpenPopovers[index] = isOpen;
      return newOpenPopovers;
    });
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" />
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
                    onOpenChange={(isOpen) => handlePopoverToggle(index, isOpen)}
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
