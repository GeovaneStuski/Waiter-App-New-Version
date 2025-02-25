'use server'

import axios, { AxiosError } from "axios";
import { cookiesName } from "./cookiesNames";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const http = axios.create({ baseURL: API_URL });

http.interceptors.request.use(
  (req) => {
    const cookiesList = cookies();

    const token = cookiesList.get(cookiesName.NEXT_AUTH_AUTHORIZATION)?.value;

    if (token) {
      req.headers.Authorization = token;
    }

    return req;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
