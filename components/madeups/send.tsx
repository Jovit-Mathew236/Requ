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

type Props = {
  formData: Form[];
};

const Send = ({ formData }: Props) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isProjectDialogOpen, setProjectDialogOpen] = useState(false);
  const closeAddDialog = () => {
    setEditDialogOpen(false);
    setProjectDialogOpen(false);
  };
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
            // data={formData}
            updatePortfolioData={updatePortfolioData}
            closeDialog={closeAddDialog}
          />
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-3 gap-4 mb-4">
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
                <DialogTrigger className="my-2" asChild>
                  <a
                    href="#"
                    className={`transition-all block max-w-sm p-6  border border-gray-200 rounded-lg shadow hover:bg-gray-100  dark:border-gray-700 dark:hover:bg-gray-700 ${
                      data.approved
                        ? "bg-green-400 dark:bg-green-800"
                        : "bg-orange-400 dark:bg-orange-800"
                    }`}
                    onClick={() => openEditDialog(i)}
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {data.title} {/* Assuming Form has a 'title' field */}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {data.message}{" "}
                      {/* Assuming Form has a 'description' field */}
                    </p>
                  </a>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when done.
                    </DialogDescription>
                  </DialogHeader>
                  <RequestFrom
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
          <div>There is no request</div>
        )}
      </div>
    </>
  );
};

export default Send;
