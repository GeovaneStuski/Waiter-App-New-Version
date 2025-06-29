export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  position: Position;
};

export enum Position {
  "admin" = "admin",
  "waiter" = "waiter",
}
