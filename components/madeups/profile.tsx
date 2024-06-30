"use client";
import { Form } from "@/lib/enums";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import RequestFrom from "./modules/request-from";
type Props = {
  formData: Form[];
};

const Profile = ({ formData }: Props) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setProjectDialogOpen(false);
  };
  const [portfolioData, setPortfolioData] = useState<Form[]>(formData);
  console.log(portfolioData);

  const updatePortfolioData = (newData: any) => {
    setPortfolioData(newData);
    console.log(newData);
  };
  return (
    <>
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogTrigger className="my-2" asChild>
          <Button variant="outline">Add new</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <RequestFrom
            data={formData}
            updatePortfolioData={updatePortfolioData}
            closeDialog={closeEditDialog}
          />
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {portfolioData.length > 0 &&
          portfolioData.map((data, i) => (
            <a
              key={i} // Adding a unique key prop for each iteration is necessary in React
              href="#"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.title} {/* Assuming Form has a 'title' field */}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {data.message} {/* Assuming Form has a 'description' field */}
              </p>
            </a>
          ))}
      </div>
    </>
  );
};

export default Profile;
