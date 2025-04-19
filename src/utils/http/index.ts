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

interface HttpClientMethods {
  get: <T>(endpoint: string, headers?: Headers) => Promise<T> 
  post: <T>(endpoint: string, body: object, headers?: Headers) => Promise<T>
  put: <T>(endpoint: string, body: object, headers?: Headers) => Promise<T>
  patch: <T>(endpoint: string, body: object, headers?: Headers) => Promise<T>
  delete: <T>(endpoint: string, headers?: Headers) => Promise<T>
}

class HttpClient implements HttpClientMethods {
  private url;

  constructor(url: string | undefined) {
    this.url = url;
  }

  public get<T>(endpoint: string, headers?: Headers) {
    return this.requester<T>({
      endpoint,
      method: Method.GET,
      headers,
    });
  };

  public post<T>(endpoint: string, body: object, headers?: Headers) {
    return this.requester<T>({
      endpoint,
      method: Method.POST,
      body,
      headers,
    });
  };

  public put<T>(endpoint: string, body: object, headers?: Headers) {
    return this.requester<T>({
      endpoint,
      method: Method.PUT,
      body,
      headers,
    });
  };

  public patch<T>(endpoint: string, body: object, headers?: Headers) {
    return this.requester<T>({
      endpoint,
      method: Method.PATCH,
      body,
      headers,
    });
  };

  public delete<T>(endpoint: string, headers?: Headers) {
    return this.requester<T>({
      endpoint,
      method: Method.DELETE,
      headers,
    });
  };

  private async requester<T>(props: Request) {
    const AuthCookie = await this.getCookie();

    console.log({AuthCookie});

    const headers = new Headers();

    if(AuthCookie) {
      headers.append('Authorization', AuthCookie);
    }

    if(props.headers) {
      Object.entries(props.headers).forEach(([key, value]) => headers.append(key, value));
    }

    if(props.body) {
      const body = (props.body as any);
      
      if(body?.image) {
        if(typeof body.image === 'string') {
          headers.append('Content-Type', 'application/json');
        } else {
          const formData = new FormData();
  
          Object.entries(props.body).forEach(([key, value]) => {
            if(key === 'ingredients') {
              return formData.append('ingredients[]', value);
            }
            
            formData.append(key, value);
          });
  
          props.body = formData;
        }
      } else {
        headers.append('Content-Type', 'application/json');
      }
    }

    const response = await fetch(`${this.url}${props.endpoint}`, {
      method: props.method,
      body: props.body instanceof FormData ? props.body : JSON.stringify(props.body),
      headers
    });

    if(response.status >= 400) {
      const message = await response.json();
      throw new Error(message);
    }
  
    return response.json() as Promise<T>;
  }

  private async getCookie() {
    const cookies = await getCookies();
    
    if(typeof window === 'undefined') {
      return cookies.get(cookiesName['NEXT_AUTH_AUTHORIZATION'])?.value;
    }

    return getCookie(cookiesName['NEXT_AUTH_AUTHORIZATION']);
  }
}

export const http = new HttpClient(API_URL);