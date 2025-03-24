import { getCookies } from '@/app/(get-server-props)/get-cookies';
import { cookiesName } from '../cookiesNames';
import { getCookie } from 'cookies-next/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

enum Method {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Request = {
  method: Method;
  body?: object;
  headers?: Headers;
  endpoint: string;
};

export const http = {
  get: <T>(endpoint: string, headers?: Headers)=> requester<T>({ 
    endpoint, 
    method: Method.GET,
    headers,
  }),
  post: <T>(endpoint: string, body: object, headers?: Headers)=> requester<T>({ 
    endpoint, 
    method: Method.POST,
    headers,
    body,
  }),
  put: <T>(endpoint: string, body: object, headers?: Headers)=> requester<T>({ 
    endpoint, 
    method: Method.PUT,
    headers,
    body,
  }),
  patch: <T>(endpoint: string, body: object, headers?: Headers)=> requester<T>({ 
    endpoint, 
    method: Method.PATCH,
    headers,
    body,
  }),
  delete: <T>(endpoint: string, headers?: Headers)=> requester<T>({ 
    endpoint, 
    method: Method.DELETE,
    headers,
  }),
};

async function requester<T>(props: Request) {
  const cookies = await getCookies();

  const accessToken = typeof window !== 'undefined' ? getCookie(cookiesName['NEXT_AUTH_AUTHORIZATION']) : cookies.get(cookiesName['NEXT_AUTH_AUTHORIZATION'])?.value;

  const headers = new Headers();

  if(props.headers) {
    Object.entries(props.headers).forEach(([key, value]) => headers.append(key, value));
  }

  if(accessToken) {
    headers.append('Authorization', accessToken);
  }

  if(props.method !== 'GET') {
    headers.append('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${props.endpoint}`, {
    method: props.method,
    body: props.body ? JSON.stringify(props.body) : undefined,
    headers
  });

  const data = await response.json();

  return data as T;
}
