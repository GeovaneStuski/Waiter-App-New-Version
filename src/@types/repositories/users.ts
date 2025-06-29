import { Position } from "../entities/user";

export type CreateOrUpdateUserPayload = {
  name: string;
  email: string;
  password: string;
  position: Position;
};
