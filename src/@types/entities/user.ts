export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  position: Position;
};

export type Position = "admin" | "waiter";
