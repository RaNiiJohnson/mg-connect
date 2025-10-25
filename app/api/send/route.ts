import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["johnsontolotriniavo@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: error.message || error }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Catch error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
