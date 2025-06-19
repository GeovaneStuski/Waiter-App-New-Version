import { http } from "../utils/http";
import { User } from "@/@types/entities/user";
import { CreateOrUpdateUserPayload } from "@/@types/repositories/users";

export const UsersRepository = {
  list: async () => http.get<User[]>("/users"),

  create: async (data: CreateOrUpdateUserPayload) => http.post("/users", data),

  update: async (id: string, data: CreateOrUpdateUserPayload) =>
    http.put(`/users/${id}`, data),

  delete: async (id: string) => http.delete(`/users/${id}`),
};
