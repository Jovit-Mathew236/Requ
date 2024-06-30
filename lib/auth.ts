import Cookies from "js-cookie";
import { publicGateway } from "./api";

export const signIn = async (email: string, hash: string) => {
  try {
    const response = await publicGateway.post("/auth/signin", {
      email,
      hash,
    });
    const { access_token, refresh_token } = response.data.data;
    Cookies.set("access_token", access_token, { expires: 7 });
    Cookies.set("refresh_token", refresh_token, { expires: 7 });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
export const signUp = async (data: any) => {
  try {
    const response = await publicGateway.post("/auth/signup", data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  window.location.href = "/signin";
};
