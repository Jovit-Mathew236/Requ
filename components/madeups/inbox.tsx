"use client";
import { Form } from "@/lib/enums";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import RequestFrom from "./modules/request-from";
import ReplayForm from "./modules/replay-form";
import { Badge } from "../ui/badge";

type Props = {
  formData: Form[];
};

const Inbox = ({ formData }: Props) => {
  const [editDialogStates, setEditDialogStates] = useState<boolean[]>(
    formData.map(() => false) // Initialize with false for each portfolio item
  );

  const closeEditDialog = () => {
    setEditDialogStates(formData.map(() => false));
  };

  const [portfolioData, setPortfolioData] = useState<Form[]>(formData);

  const updatePortfolioData = (newData: any) => {
    setPortfolioData(newData);
    console.log(newData);
  };

  const openEditDialog = (index: number) => {
    const newDialogStates = [...editDialogStates];
    newDialogStates[index] = true;
    setEditDialogStates(newDialogStates);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      {portfolioData.length > 0 ? (
        portfolioData.map((data, i) => (
          <div key={i}>
            <Dialog
              open={editDialogStates[i]}
              onOpenChange={(isOpen) => {
                const newDialogStates = [...editDialogStates];
                newDialogStates[i] = isOpen;
                setEditDialogStates(newDialogStates);
              }}
            >
              <DialogTrigger asChild>
                <a
                  href="#"
                  className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  onClick={() => openEditDialog(i)}
                >
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.title} {/* Assuming Form has a 'title' field */}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {data.message}{" "}
                    {/* Assuming Form has a 'description' field */}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <Badge variant={data.approved ? "default" : "secondary"}>
                      {data.approved ? "Approved" : "Not Approved"}
                    </Badge>
                  </p>
                </a>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when done.
                  </DialogDescription>
                </DialogHeader>
                <ReplayForm
                  prevData={data}
                  allData={formData}
                  updatePortfolioData={updatePortfolioData}
                  closeDialog={closeEditDialog}
                />
              </DialogContent>
            </Dialog>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center">
          There are no requests to display.
        </div>
      )}
    </div>
  );
};

export default Inbox;
