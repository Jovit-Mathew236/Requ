"use client";
// Import necessary React methods and your UI components
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { Role } from "@/lib/enums";

const FormSchema = z.object({
  firstname: z.string().nonempty("First name is required."),
  lastname: z.string().nonempty("Last name is required."),
  roleId: z.string().nonempty("Role is required."), // Treat IDs as strings
  departmentId: z.string().nonempty("Department is required."),
  collegeId: z.string().nonempty("Id is required."),
  email: z.string().email("Invalid email address."),
  hash: z.string().min(8, "Password must be at least 8 characters."),
});

export function SignUp() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [colleges, setColleges] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Role[]>([]);
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
    api.colleges().then((data) => {
      setColleges(data);
    });
    api.departments().then((data) => {
      setDepartments(data);
    });
  }, []); // Empty array means this effect will only run once on mount

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      roleId: "", // Use undefined for initial non-selection state
      departmentId: "",
      collegeId: "",
      email: "",
      hash: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const user = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        hash: data.hash,
        roleId: parseInt(data.roleId),
        collegeId: parseInt(data.collegeId),
        departmentId: parseInt(data.departmentId),
      };
      console.log("Signing up user:", user);

      await api.signup(user);
      router.push("/auth/signin");
    } catch (error: any) {
      console.error(error);
      return;
    }
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to Requ
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to Requ if you can because we don&apos;t have a login flow yet
          </p>
          <Form {...form}>
            <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input placeholder="iron" {...field} />
                      </LabelInputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input placeholder="man" {...field} />
                      </LabelInputContainer>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <LabelInputContainer>
                      <Label htmlFor="email">Email Address</Label>
                      <Input placeholder="projectmayhem@fc.com" {...field} />
                    </LabelInputContainer>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hash"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <LabelInputContainer>
                      <Label htmlFor="password">Password</Label>
                      <Input placeholder="••••••••" {...field} />
                    </LabelInputContainer>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
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
                            <SelectItem
                              key={role.id}
                              value={role.id.toString()}
                            >
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
                name="collegeId"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <LabelInputContainer>
                      <Label>College</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select your college" />
                        </SelectTrigger>
                        <SelectContent>
                          {colleges?.map((college) => (
                            <SelectItem
                              key={college.id}
                              value={college.id.toString()}
                            >
                              {college.name}
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
                name="departmentId"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <LabelInputContainer>
                      <Label>Department</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select your dept" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments?.map((department) => (
                            <SelectItem
                              key={department.id}
                              value={department.id.toString()}
                            >
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </LabelInputContainer>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                className="mt-4 bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium"
                type="submit"
              >
                Sign up &rarr;
              </button>
            </form>
          </Form>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

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
