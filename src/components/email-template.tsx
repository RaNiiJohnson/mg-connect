interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Merci de t&apos;être inscrit sur notre plateforme !</p>
    </div>
  );
}

interface EmailVerificationTemplateProps {
  verificationUrl: string;
  userEmail: string;
}

export function EmailVerificationTemplate({
  verificationUrl,
  userEmail,
}: EmailVerificationTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#333", textAlign: "center" }}>
        Vérifiez votre adresse email
      </h1>
      <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
        Bonjour,
      </p>
      <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
        Merci de vous être inscrit ! Pour activer votre compte{" "}
        <strong>{userEmail}</strong>, veuillez cliquer sur le lien ci-dessous :
      </p>
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a
          href={verificationUrl}
          style={{
            backgroundColor: "#007cba",
            color: "white",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "5px",
            display: "inline-block",
            fontSize: "16px",
          }}
        >
          Vérifier mon email
        </a>
      </div>
      <p style={{ fontSize: "14px", color: "#777" }}>
        Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre
        navigateur :
      </p>
      <p style={{ fontSize: "14px", color: "#007cba", wordBreak: "break-all" }}>
        {verificationUrl}
      </p>
      <p style={{ fontSize: "14px", color: "#777", marginTop: "30px" }}>
        Ce lien expire dans 24 heures pour des raisons de sécurité.
      </p>
    </div>
  );
}
