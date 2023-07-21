import { EmailTemplate } from "@/components/email/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { type CreateEmailOptions } from "resend/build/src/emails/interfaces";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const emailData = {
    from: "Doghouse <hola@doghouse.mx>",
    to: ["lehiarteaga@gmail.com"],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "Jose" }),
  };

  try {
    const data = await resend.emails.send(emailData as CreateEmailOptions);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
