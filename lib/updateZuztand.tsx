"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/useUserStore";
import { getProfile } from "./dasboard";
import { User } from "./enums";

const UpdateZustand = () => {
  const { setUserName, setUserRole } = useUserStore();
  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (profileData) {
      setUserName(profileData?.firstname ?? "");
      setUserRole(profileData?.roleId ?? 1);
    }
  }, [profileData, setUserName, setUserRole]);

  return null; // This component doesn't render anything
};

export default UpdateZustand;
