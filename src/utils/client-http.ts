'use client'

import axios from "axios";
import { getCookie } from "cookies-next/client";
import { cookiesName } from "./cookiesNames";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const http = axios.create({ baseURL: API_URL });

http.defaults.headers.common.Authorization = getCookie(cookiesName['NEXT_AUTH_AUTHORIZATION']);