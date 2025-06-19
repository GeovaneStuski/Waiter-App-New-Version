export enum Position {
  WAITER = "WAITER",
  ADMIN = "ADMIN",
}

export type CreateOrUpdateUserPayload = {
  name: string;
  email: string;
  password: string;
  position: Position;
};
