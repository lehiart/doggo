"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function setNewPassword(data: any, token: string) {
  "use server";

  if (!data.newPassword || !token) {
    return;
  }

  const user = await db.user.findFirst({
    where: {
      resetPasswordToken: {
        some: {
          AND: [
            {
              token,
            },
            {
              expires: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // max 1 day ago
              },
            },
          ],
        },
      },
    },
  });

  if (!user) {
    return {
      status: 400,
      body: "Invalid token",
    };
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 12);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      hashedPassword: hashedPassword,
      resetPasswordToken: {
        deleteMany: {},
      },
    },
  });

  return {
    status: 200,
    body: "Password changed",
  };
}
