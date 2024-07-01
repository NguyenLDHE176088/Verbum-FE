"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PreCompanySchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getUser } from "@/lib/cookies";
import { createCompany } from "@/data/company";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function UserInfor() {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  //Define the form schema
  const form = useForm<z.infer<typeof PreCompanySchema>>({
    resolver: zodResolver(PreCompanySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
    },
  });

  //Todo: Handle Error
  async function onSubmit(value: z.infer<typeof PreCompanySchema>) {
    const { id } = await getUser();
    const { firstName, lastName, companyName } = value;
    startTransaction(async () => {
      const response = await createCompany({
        firstName,
        lastName,
        companyName,
        userId: id,
      });
      if (response.error) {
        console.log(response.error);
      } else {
        router.push("/jobs");
      }
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form className="m-auto" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Let&apos;s finish your setup!</CardTitle>
              <CardDescription>
                Please give us your additional information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardHeader>
              <CardTitle>Create company</CardTitle>
              <CardDescription>Please create your company</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full mt-3"
                type="submit"
                disabled={isPending}
              >
                Finish
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
