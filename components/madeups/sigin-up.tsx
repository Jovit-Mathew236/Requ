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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import api from "@/lib/api";

const FormSchema = z.object({
  firstname: z.string().min(3, {
    message: "firstname is required.",
  }),
  lastname: z.string().min(3, {
    message: "lastname is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  hash: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignUp() {
  const [roles, setRoles] = useState();
  const router = useRouter();

  useEffect(() => {
    api
      .roles()
      .then((data) => {
        console.log(data);
        // setRoles(data);
      })
      .catch((error) => {
        console.error("Failed to fetch roles:", error);
      });
  }, []); // Empty array means this effect will only run once on mount

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      hash: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    router.push("/signin");
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
