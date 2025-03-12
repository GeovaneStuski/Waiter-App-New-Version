'use server';

import axios from 'axios';
import { cookiesName } from './cookiesNames';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const http = axios.create({ baseURL: API_URL });

const storeCookies = cookies();

http.defaults.headers.Authorization = storeCookies.get(cookiesName.NEXT_AUTH_AUTHORIZATION)?.value || '';