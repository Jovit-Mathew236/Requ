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
  replay: z.string().nonempty("replay is required"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type RequestForm = {
  prevData?: FormType;
  allData?: FormType[];
  updatePortfolioData: any;
  closeDialog: () => void; // Add closeDialog prop
};
const ReplayForm = ({
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
      replay: prevData?.replay || "",
    },
  });

  const onSubmit: SubmitHandler<EmailFormData> = async (data) => {
    try {
      setIsLoading(true);

      // Call CreateRequest with newData
      await patchForm(prevData?.id || 1, data).then((data) => {
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
          title: "Replay sent successfully",
          description: "Please wait for resubmit",
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
        form.setError("replay", {
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

  const approveButton = () => {
    try {
      patchForm(prevData?.id || 1, {
        approved: true,
      }).then((data: FormType) => {
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
          title: "Request Approved",
        });
        closeDialog();
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  };

  return (
    <>
      {prevData && (
        <div className="mt-4 p-4 bg-blue-100 border-l-4 border-blue-400">
          <h4 className="text-lg font-semibold text-blue-900">Title:</h4>
          <p className="mt-2 text-blue-800">{prevData.title}</p>
          <h4 className="text-lg font-semibold mt-4 text-blue-900">Message:</h4>
          <p className="mt-2 text-blue-800">{prevData.message}</p>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="replay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Replay</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#F1F1F1] rounded-sm focus:bg-[#07C553]/10 focus-visible:ring-offset-0 focus-visible:ring-[#07C553] focus:outline-none focus:border-[#07C553] focus:text-black border-none px-6 py-6"
                      placeholder="Enter your replay"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            variant={"default"}
            className="w-full bg-green-600 px-6 py-6"
            disabled={isLoading}
            onClick={approveButton}
          >
            Approve
          </Button>
          <Button
            type="submit"
            className="w-full bg-[#456FF6] px-6 py-6"
            disabled={isLoading}
          >
            Send replay
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ReplayForm;

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
