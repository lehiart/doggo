import { User } from "@prisma/client";

export type UserSessionResult = {
  id: string;
  user: Pick<User, "id" | "name" | "email" | "image" | "role">;
} | null;

export type CurrentUserSession =
  | Pick<User, "id" | "name" | "email" | "image" | "role">
  | undefined;
