"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateRequest,
  UserFaculty,
  getAllUser,
  patchForm,
} from "@/lib/dasboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Form as FormType, User } from "@/lib/enums";
import { useUserStore } from "@/lib/store/useUserStore";

const emailSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  title: z.string().nonempty("Title is required"),
  message: z.string().nonempty("message is required"),
  toId: z.string().nonempty("to is required"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type RequestForm = {
  prevData?: FormType;
  allData?: FormType[];
  updatePortfolioData: any;
  closeDialog: () => void; // Add closeDialog prop
};
const RequestFrom = ({
  prevData,
  allData,
  updatePortfolioData,
  closeDialog,
}: RequestForm) => {
  const { userRole } = useUserStore();

  const [faculty, setFaculty] = useState<User[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRole === 1
      ? UserFaculty().then((data) => {
          setFaculty(data);
        })
      : getAllUser().then((data) => {
          setFaculty(data);
        });
  }, [userRole]);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: prevData?.email || "", // Set default values based on formData
      title: prevData?.title || "",
      message: prevData?.message || "",
      toId: prevData?.toId?.toString() || "", // Assuming toId is a string
    },
  });

  const onSubmit: SubmitHandler<EmailFormData> = async (data) => {
    try {
      setIsLoading(true);

      // Ensure toId is parsed and included in newData
      const newData = {
        ...data,
        toId: parseInt(data.toId),
      };

      // Call CreateRequest with newData
      prevData === null
        ? await CreateRequest(newData).then((data) => {
            updatePortfolioData(data);
            toast({
              variant: "default",
              title: "Request sent successfully",
              description: "Please wait for replay",
            });
            closeDialog();
          })
        : await patchForm(prevData?.id || 1, newData).then((data) => {
            const newForms = { ...allData };

            // Update entries in newForms with the new data
            Object.keys(newForms).forEach((key: any) => {
              if (newForms[key].id === data.id) {
                newForms[key] = data;
              }
            });
            const newArray = Object.values(newForms);
            updatePortfolioData(newArray);
            toast({
              variant: "default",
              title: "Request Updated",
            });
            closeDialog();
          });

      setIsLoading(false);
      // router.push("/dashboard/inbox");
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);

      // Update error handling for email field
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
    <>
      {prevData?.replay && (
        <div className="mt-4 p-4 bg-orange-100 border-l-4 border-orange-400">
          <h4 className="text-lg font-semibold text-orange-900">Replay:</h4>
          <p className="mt-2 text-orange-800">{prevData?.replay}</p>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="toId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <LabelInputContainer>
                  <Label htmlFor="to">To</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      {faculty?.map((data) => (
                        <SelectItem key={data.id} value={data.id.toString()}>
                          {data.firstname} {data.lastname}
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                    placeholder="enter your title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                    placeholder="Enter your request"
                    {...field}
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
            Send Request
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RequestFrom;

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
