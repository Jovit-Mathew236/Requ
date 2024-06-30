"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/madeups/profile";
import { getForm } from "@/lib/dasboard";
import { Form } from "@/lib/enums";

const Pages = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getForm();
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
      <Profile formData={formData} />
    </div>
  );
};

export default Pages;
