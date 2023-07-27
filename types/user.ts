import { User } from "@prisma/client";

export type UserSessionResult = {
  id: string;
  user: Pick<User, "id" | "name" | "email" | "image">;
} | null;

export type CurrentUserSession =
  | Pick<User, "id" | "name" | "email" | "image">
  | undefined;
