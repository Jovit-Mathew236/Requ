"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
//   import { title } from "process";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/enums";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
type Props = {};
const FormSchema = z.object({
  title: z.string().nonempty("Title is required."),
  message: z.string().nonempty("Request is required."),
  receiverId: z.string().nonempty("Id is required."),
});

const RequForm = (props: Props) => {
  const [roles, setRoles] = useState<Role[]>([]);

  const router = useRouter();

  useEffect(() => {
    api
      .roles()
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error("Failed to fetch roles:", error);
      });
  }, []); // Empty array means this effect will only run once on mount
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      receiverId: "",
      title: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(data);

      //   console.log("Signing up user:", user);

      //   await api.signup(user);
      router.push("/auth/signin");
    } catch (error: any) {
      console.error(error);
      return;
    }
  };

  return (
    <div id="crud-modal" tabIndex={-1} aria-hidden="true">
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <Form {...form}>
          <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="receiverId"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <LabelInputContainer>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles?.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </LabelInputContainer>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <LabelInputContainer>
                    <Label htmlFor="email">Subject</Label>
                    <Input placeholder="Title for your request" {...field} />
                  </LabelInputContainer>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <LabelInputContainer>
                    <Label htmlFor="message-2">Your Message</Label>
                    <Textarea
                      placeholder="Type your request here."
                      className="h-32"
                      id="message-2"
                      {...field}
                    />
                  </LabelInputContainer>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              className="mt-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full text-white rounded-md h-10 font-medium"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RequForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
