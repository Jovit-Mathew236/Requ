import { privateGateway } from "./api";

export const CreateRequest = async (data: any) => {
  try {
    const response = await privateGateway.post("/form", data);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch profile data:", error);
    const errorMessage = error.response?.data?.error;
    throw new Error(JSON.stringify(errorMessage));
  }
};

export const UserFaculty = async () => {
  try {
    const response = await privateGateway.get("/user/faculty");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const getForm = async () => {
  try {
    const response = await privateGateway.get("/form");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
