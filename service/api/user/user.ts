import { IUser } from "@/interface/user";
import axios from "axios";

export async function getProfileAPI(): Promise<IUser> {
  return axios
    .get("/auth/profile")
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to get user profile");
    });
}

export async function editProfileAPI(data: FormData) {
  return axios
    .put("/auth/profile", data)
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data?.message || "Failed to edit user profile");
    });
}
