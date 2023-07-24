import React from "react";

interface EmailTemplateProps {
  firstName: string;
  token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  token,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Tu token es:</p>
    <p>
      {process.env.NEXT_PUBLIC_APP_URL}/activar/{token}
    </p>
  </div>
);
