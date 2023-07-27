import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { type CreateEmailOptions } from "resend/build/src/emails/interfaces";
import VerifyTokenEmail from "@/emails/verify-token-email";
import { use } from "react";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const userExists = await db.company.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.company.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // User created OK - Start verification token email process
    if (user) {
      const verificationTokenData = {
        companyId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      };

      const token = await db.verificationToken.create({
        data: verificationTokenData,
      });

      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailData = {
        from: "Doghouse <hola@doghouse.mx>",
        to: ["lehiarteaga@gmail.com"],
        subject: "Activa tu cuenta",
        react: VerifyTokenEmail({ firstName: name, token: token.token }),
        headers: { "X-Entity-Ref-ID": new Date().getTime().toString() },
      };

      await resend.emails.send(emailData as CreateEmailOptions);

      return NextResponse.json({ success: "ok", status: 200 });
    }
  } catch (error) {
    console.error(error, "COMPANY_REGISTRATION_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
