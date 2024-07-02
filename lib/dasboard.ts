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

export const getAllUser = async () => {
  try {
    const response = await privateGateway.get("/user");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const getSendForm = async () => {
  try {
    const response = await privateGateway.get("/form/send");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const getReceiveForm = async () => {
  try {
    const response = await privateGateway.get("/form/receive");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const patchForm = async (id: number, formData: any) => {
  try {
    const response = await privateGateway.patch(`/form/${id}`, formData);
    return response.data;
  } catch (error: any) {
    // You might want to handle specific error cases here based on your application needs
    throw new Error(`Failed to update form with ID ${id}: ${error.message}`);
  }
};

export const getProfile = async () => {
  try {
    const response = await privateGateway.get("/user/profile");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
