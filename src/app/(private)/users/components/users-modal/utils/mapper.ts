import { UserModalFormData } from "../use-user-modal";
import { CreateOrUpdateUserPayload } from "@/@types/repositories/users";

export function UserFormSchemaToUser({ user }: UserModalFormData) {
  return {
    email: user.email,
    name: user.name,
    password: user.password,
    position: user.position,
  } satisfies CreateOrUpdateUserPayload;
}
