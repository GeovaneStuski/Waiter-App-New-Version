import { User } from './user';

export type SigninPayload = {
  email: string;
  password: string;
}

export type SigninResponse = {
  user: User;
  token: string;
}