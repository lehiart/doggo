import VerifyTokenEmail from "@/emails/verify-token-email";
import { db } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new NextResponse(null, { status: 403 });
    }

    const user = await db.user.findFirst({
      where: {
        emailVerified: false, // do nothing if user is already verified
        email, // match by email param
        verificationTokens: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
            ],
          },
        },
      },
      select: {
        id: true,
        name: true,
        verificationTokens: true,
      },
    });

    // Do nothing if no user is found
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const token = user?.verificationTokens[0];
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (token) {
      const createdAtDate = new Date(token.createdAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(new Date().getDate() - 7);

      if (createdAtDate < sevenDaysAgo) {
        // createdAt Date is more than 7 days ago, so generate a new token and send email with that token

        const verificationTokenData = {
          userId: user.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        };
        const newToken = await db.verificationToken.create({
          data: verificationTokenData,
        });
        const emailData = {
          from: "Doghouse <hola@doghouse.mx>",
          to: ["lehiarteaga@gmail.com"],
          subject: "Activa tu cuenta",
          react: VerifyTokenEmail({
            firstName: user.name || " ",
            token: newToken.token,
          }),
          headers: { "X-Entity-Ref-ID": new Date().getTime().toString() },
        };
        await resend.emails.send(emailData as CreateEmailOptions);
      } else {
        //  createdAt Date is leess than 7 days ago, so just send again the existing token

        const emailData = {
          from: "Doghouse <hola@doghouse.mx>",
          to: ["lehiarteaga@gmail.com"],
          subject: "Activa tu cuenta",
          react: VerifyTokenEmail({
            firstName: user.name || " ",
            token: token.token,
          }),
          headers: { "X-Entity-Ref-ID": new Date().getTime().toString() },
        };

        await resend.emails.send(emailData as CreateEmailOptions);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error, "TOKEN_REFRESH_ERROR");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
