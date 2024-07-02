"use client";
import React, { useEffect, useState } from "react";
import Send from "@/components/madeups/send";
import { getSendForm } from "@/lib/dasboard";
import { Form } from "@/lib/enums";

const Pages = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getSendForm();
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
      <Send formData={formData} />
    </div>
  );
};

export default Pages;
