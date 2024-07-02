"use client";
import React, { useEffect, useState } from "react";
import { getReceiveForm } from "@/lib/dasboard";
import { Form } from "@/lib/enums";
import Inbox from "@/components/madeups/inbox";

const Pages = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getReceiveForm();
        setFormData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run the effect only once

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Inbox formData={formData} />
    </div>
  );
};

export default Pages;
