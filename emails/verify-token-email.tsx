import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyTokenEmailProps {
  firstName: string;
  token: string;
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const VerifyTokenEmail = ({
  firstName = "Username",
  token,
}: VerifyTokenEmailProps) => (
  <Html>
    <Head />
    <Preview> Bienvenido a doghouse, por favor confirma tu cuenta</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading>Doghouse</Heading>
          <Hr style={hr} />
          <Text style={paragraph}> Hola, {firstName}</Text>
          <Text style={paragraph}>
            Gracias por registrarte en Doghouse. Por favor confirma tu cuenta
            dando click en el siguiente botón.
          </Text>
          <Button
            pX={10}
            pY={10}
            style={button}
            href={`${process.env.NEXT_PUBLIC_APP_URL}/activar/${token}`}
          >
            Verifica tu email
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            Si tienes alguna duda, por favor contactanos a través de nuestro
            correo{" "}
            <Link style={anchor} href="https://stripe.com/docs">
              contacto@doghouse.mx
            </Link>
          </Text>
          <Text style={paragraph}>— El equipo Doghouse</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Doghouse, 354 Oyster Point Blvd, South San Francisco, CA 94080
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerifyTokenEmail;
