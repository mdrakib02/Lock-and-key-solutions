import { Resend } from "resend";
import { NextResponse } from "next/server";
import EmailTemplate from "@/components/email-template";







const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      zipCode,
      location,
      timing,
      projectDetails,
    } = await req.json();

    const data = await resend.emails.send({
      to: ['mdrakibahmed514@gmail.com'],
      from: "Locksmith Denver COlorado <onboarding@resend.dev>",   // FIXED
      subject: "New Contact Form Submission",
      react: EmailTemplate({
        name,
        email,
        phone,
        zipCode,
        location,
        timing,
        projectDetails,
      }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
