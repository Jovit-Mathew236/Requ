"use client";
import { Form } from "@/lib/enums";
import React, { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type Props = {
  formData: Form[];
};

const Inbox: React.FC<Props> = ({ formData }) => {
  const [editDialogStates, setEditDialogStates] = useState<boolean[]>(
    formData.map(() => false)
  );
  const [portfolioData, setPortfolioData] = useState<Form[]>(formData);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedFromId, setSelectedFromId] = useState<string>("all");

  const closeEditDialog = () => {
    setEditDialogStates(formData.map(() => false));
  };

  const filteredPortfolioData = useMemo(() => {
    return portfolioData
      .filter((item) => {
        if (selectedStatus === "all") {
          return true;
        }
        return item.approved === (selectedStatus === "approved");
      })
      .filter((item) => {
        if (selectedFromId === "all") {
          return true;
        }
        return item.email === selectedFromId;
      });
  }, [selectedStatus, selectedFromId, portfolioData]);

  const updatePortfolioData = (newData: Form[]) => {
    setPortfolioData(newData);
  };

  const openEditDialog = (index: number) => {
    const newDialogStates = [...editDialogStates];
    newDialogStates[index] = true;
    setEditDialogStates(newDialogStates);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Select filters for status */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="non-approved">Non-Approved</SelectItem>
            </SelectContent>
          </Select>

          {/* Select filters for users */}
          <Select
            value={selectedFromId}
            onValueChange={setSelectedFromId}
            // className="w-48"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {formData
                .filter(
                  (data, i) =>
                    formData.findIndex((item) => item.email === data.email) ===
                    i
                )
                .map((item) => (
                  <SelectItem key={item.id} value={item.email}>
                    {item.email}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {filteredPortfolioData.length > 0 ? (
          filteredPortfolioData.map((data, i) => (
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
                      {data.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {data.message}
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
                    <DialogTitle>Edit Request</DialogTitle>
                    <DialogDescription>
                      Make changes to the request here. Click save when done.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Assume ReplayForm handles editing and updating */}
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
            There are no requests matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
