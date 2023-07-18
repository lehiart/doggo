import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { UserSessionResult } from "@/types/user";

export async function getCurrentUser() {
  const session: UserSessionResult = await getServerSession(authOptions);

  return session?.user;
}
