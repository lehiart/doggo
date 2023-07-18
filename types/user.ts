import { User } from "@prisma/client";

export type UserSessionResult = {
  id: string;
  user: Pick<User, "id" | "name" | "email" | "image">;
} | null;

export type CurrentUserSession =
  | Pick<User, "id" | "name" | "email" | "image">
  | undefined;

export type EditableUserData =
  | Pick<
      User,
      "bio" | "name" | "links" | "location" | "image" | "phone" | "email"
    >
  | null
  | undefined;

// same as EditableUserData but extends the URL property
export interface ExtendedUserProfileForm
  extends Pick<
    User,
    "bio" | "name" | "links" | "location" | "image" | "phone" | "email"
  > {
  url: string;
}
