"use server";

import ResetPasswordEmail from "@/emails/reset-password-email";
import { db } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { type CreateEmailOptions } from "resend/build/src/emails/interfaces";

export async function sendRecoveryEmail(data: any) {
  "use server";

  if (!data.email) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email.toLowerCase(),
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return;
  }

  // if user exists generate token and send email
  const tokenData = {
    userId: user.id,
    token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  };

  const token = await db.resetPasswordToken.create({
    data: tokenData,
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const emailData = {
    from: "Doghouse <hola@doghouse.mx>",
    to: ["lehiarteaga@gmail.com"],
    subject: "Cambio de contraseña",
    react: ResetPasswordEmail({ token: token.token }),
    headers: { "X-Entity-Ref-ID": new Date().getTime().toString() },
  };

  await resend.emails.send(emailData as CreateEmailOptions);

  return;
}
