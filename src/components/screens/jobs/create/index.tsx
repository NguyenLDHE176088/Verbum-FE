"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import {
  fetchProjectSourceLanguage,
  fetchProjectTargetLanguages,
} from "@/data/projects";
import { fetchUserCompany } from "@/data/company";
import { fetchUsersBySourceAndTargetLanguage } from "@/data/users";
import { createJob } from "@/data/job";
import { Http } from "@mui/icons-material";

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
  isQaNeeded: z.array(z.boolean().optional()),
});

export function CreateJobScreen({ projectId }) {
  const [userId, setUserId] = useState<string>();
  const [userCompany, setUserCompany] = useState<string>();
  const [projectSourceLanguage, setProjectSourceLanguage] =
    useState<Language>();
  const [projectTargetLanguages, setProjectTargetLanguages] = useState([]);
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState([]);
  const [checkedLanguages, setCheckedLanguages] = useState({});
  const [isQaNeededState, setIsQaNeededState] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const [selectedQAs, setSelectedQAs] = useState({});
  const router = useRouter();

  const getUserId = async () => {
    const response = await getUserIdFromCookie();
    setUserId(response);
    return response;
  };

  useEffect(() => {
    const initialize = async () => {
      const userId = await getUserId();
      if (userId) {
        await Promise.all([
          fetchUserCompany(userId).then((data) => setUserCompany(data)),
        ]);
      }
      if (projectId) {
        await Promise.all([
          fetchProjectSourceLanguage(projectId as string).then((data) =>
            setProjectSourceLanguage(data.language)
          ),
          fetchProjectTargetLanguages(projectId as string).then((data) =>
            setProjectTargetLanguages(data)
          ),
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
    // Toggle the checkbox state
    setCheckedLanguages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (!checkedLanguages[id]) {
      await Promise.all([
        fetchUsersBySourceAndTargetLanguage(
          userCompany,
          projectSourceLanguage.code,
          id
        ).then((data) => {
          setSelectedTargetLanguages((prev) => [...prev, data]);
        }),
      ]);
    } else {
      setSelectedTargetLanguages((prev) =>
        prev.filter((lang) => lang.code !== id)
      );
    }
  };

  const handleUserSelection = (code, users) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [code]: users,
    }));
  };

  const handleQaSelection = (code, users) => {
    setSelectedQAs((prev) => ({
      ...prev,
      [code]: users,
    }));
  };

  const handleQaCheckboxChange = (id) => {
    setIsQaNeededState((prev) => ({
      ...prev,
      [id]: !prev[id],
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

    const snapshot = await uploadBytes(storageRef, file, metadata);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    Object.keys(checkedLanguages).forEach((languageId) => {
      if (checkedLanguages[languageId]) {
        const jobPayload = {
          userIds: selectedUsers[languageId]?.map((user) => user.id) || [],
          name: data.file.name.split(".")[0],
          projectId: parseInt(projectId),
          targetLanguageId: languageId,
          dueDate: format(data.duedate, "yyyy-MM-dd"),
          fileExtension: `.${data.file.name.split(".").pop()}`,
          status: "new",
          documentUrl: downloadURL,
          qaRequired: {
            isUseQA: isQaNeededState[languageId] || false,
            reviewerId: selectedQAs[languageId]?.[0]?.id || "",
          },
        };

        jobsPayload.push(jobPayload);
      }
    });
    const createJobResponse = await createJob(jobsPayload);

    if (createJobResponse.status === 201) {
      if (window.confirm("Job created successfully! Click OK to view jobs.")) {
        router.push("/jobs");
      }
    } else {
      window.alert("Error creating job. Please try again.");
    }
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
              <FormLabel className="text-xl">File</FormLabel>
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
          <>
            <Separator />
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
                  <FormLabel className="text-xl bold">{`${language.code} - ${language.name}`}</FormLabel>
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
            <FormField
              control={form.control}
              key={index}
              name={`isQaNeeded[${index}]` as any}
              render={() => (
                <FormItem className="ml-10">
                  <Checkbox
                    className="mr-3"
                    disabled={!checkedLanguages[language.code]}
                    checked={!!isQaNeededState[language.code]}
                    onCheckedChange={() =>
                      handleQaCheckboxChange(language.code)
                    }
                  />
                  <FormLabel>Enable QA process</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger
                        asChild
                        disabled={!isQaNeededState[language.code]}
                      >
                        <Button
                          variant="outline"
                          className="justify-start ml-3"
                        >
                          {selectedQAs[language.code]?.length > 0
                            ? `${selectedQAs[language.code]
                                .map(
                                  (user) => user.lastName + " " + user.firstName
                                )
                                .join(", ")}`
                            : "Choose QA"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="start">
                        <UserList
                          users={(
                            selectedTargetLanguages.find(
                              (lang) => lang.code === language.code
                            )?.users || []
                          ).filter(
                            (user) =>
                              user.id !== selectedUsers[language.code]?.[0]?.id
                          )}
                          selectedUsers={selectedQAs[language.code] || []}
                          onUserSelection={(users) =>
                            handleQaSelection(language.code, users)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ))}
        <FormField
          control={form.control}
          name="duedate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-xl">Due date</FormLabel>
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
