/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";

import { useToast } from "@/components/ui/use-toast";

const emailSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  hash: z.string().nonempty("OTP is required"),
});

type EmailFormData = z.infer<typeof emailSchema>;

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      hash: "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormData> = async (data) => {
    try {
      setIsLoading(true);

      const { email, hash } = data as EmailFormData;
      await signIn(email, hash).then(() => {
        toast({
          variant: "default",
          title: "OTP sent successfully",
          description: "Please check your email for the OTP.",
        });
        setIsLoading(false);
        router.push("/dashboard/inbox");
      });
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      // update zod error in email
      if (error.message) {
        form.setError("email", {
          type: "manual",
          message: error.message,
        });
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="flex-1 flex flex-col gap-10 justify-center items-center px-4 md:px-0">
        <div className="flex flex-col items-center gap-5">
          <h1 className="font-bold text-3xl">Welcome to Requ</h1>
          <p className="font-normal text-center md:text-left">
            Seamless Requests with Requ's intuitive platform
          </p>
        </div>
        <div className="w-full sm:w-[400px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                        placeholder="Type your mail"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>hash</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                        placeholder="Enter the OTP sent to your email"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#456FF6] px-6 py-6"
                disabled={isLoading}
              >
                Signing
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex-1 hidden md:flex justify-end">
        <Image
          src="/assets/images/signin.png"
          alt="Sign in"
          width={4000}
          height={4000}
          className="w-fit h-full sm:object-cover xl:object-contain"
        />
      </div>
    </div>
  );
};

export default SignIn;
