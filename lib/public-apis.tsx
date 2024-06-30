import { publicGateway } from "./api";

export const Roles = async () => {
  try {
    const response = await publicGateway.get("/role");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};

export const Colleges = async () => {
  try {
    const response = await publicGateway.get("/college");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};

export const Departments = async () => {
  try {
    const response = await publicGateway.get("/department");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};
