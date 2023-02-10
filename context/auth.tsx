import React, { createContext, PropsWithChildren } from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { setToken } from "@/service/api/config";
import { ISignInData, ISignUpData } from "@/interface/auth";
import { useQueryClient } from "@tanstack/react-query";

interface IAuthData {
  token?: string;
  isVerified?: boolean;
  [index: string]: any;
}

interface IContextData {
  auth?: IAuthData;
  signUp?: (data: ISignUpData) => Promise<void>;
  login?: (data: ISignInData) => Promise<void>;
  logout?: () => void;
}

const userContext = createContext<IContextData>({});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<IAuthData>({});
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    let details: IAuthData = JSON.parse(localStorage.getItem("token") || "{}");
    if (details.token) {
      setAuth(details);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("token", JSON.stringify(auth));
      setToken(auth.token);
    }
  }, [auth]);

  const login = async (data: ISignInData) => {
    return await axios
      .post("/auth/login", data)
      .then((res) => {
        setAuth({ ...res.data });
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        throw new Error(message);
      });
  };

  const signUp = async (data: ISignUpData) => {
    return axios
      .post("/auth/signup", data)
      .then((res) => {
        setAuth({ ...res.data });
      })
      .catch((e) => {
        const message = e.response?.data?.message || "Network Error";
        throw new Error(message);
      });
  };

  const logout = async () => {
    await queryClient.invalidateQueries({ refetchType: "all" });
    await queryClient.clear();

    localStorage.clear();
    setAuth({});
  };

  return <userContext.Provider value={{ auth, login, signUp, logout }}>{!loading && children}</userContext.Provider>;
}

const useAuthContex = () => useContext(userContext);
export { useAuthContex };