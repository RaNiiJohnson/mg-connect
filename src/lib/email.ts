import { Resend } from "resend";
import { EmailVerificationTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  react?: React.ReactElement;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  react,
}: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@resend.dev",
      to: [to],
      subject,
      text,
      html,
      react,
    });

    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      throw new Error(`Échec de l'envoi de l'email: ${error.message || error}`);
    }

    return data;
  } catch (error) {
    console.error("Erreur dans sendEmail:", error);
    throw error;
  }
}

export async function sendVerificationEmail(
  userEmail: string,
  verificationUrl: string
) {
  return sendEmail({
    to: userEmail,
    subject: "Vérifiez votre adresse email",
    react: EmailVerificationTemplate({
      verificationUrl,
      userEmail,
    }),
  });
}
