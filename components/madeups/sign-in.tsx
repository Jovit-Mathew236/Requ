"use client";
// Import necessary React methods and your UI components
import React from "react";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Cookies from "js-cookie";

const FormSchema = z.object({
  email: z.string().email("Invalid email address."),
  hash: z.string().min(8, "Password must be at least 8 characters."),
});

export function SignIn() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      hash: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const user = {
        email: data.email,
        hash: data.hash,
      };
      // console.log("Signing in user:", user);

      await api.signin(user).then((res) => {
        Cookies.set("access_token", res.access_token, { expires: 7 });
        Cookies.set("refresh_token", res.access_token, { expires: 7 });
        router.push("/dashboard/profile");
      });
    } catch (error) {
      console.error("Failed to sign up:", error);
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
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </LabelInputContainer>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                className="mt-4 bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium"
                type="submit"
              >
                Sign In &rarr;
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
