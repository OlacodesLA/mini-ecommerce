import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

const YOUR_EMAIL_ADDRESS = "sales@irolagos.com";
// Replace with your SMTP credentials
const smtpOptions = {
  //   host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  //   port: parseInt(process.env.SMTP_PORT || "2525"),
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER || "user",
  //     pass: process.env.SMTP_PASSWORD || "password",
  //   },
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: YOUR_EMAIL_ADDRESS,
    // serviceClient: key.client_id,
    // privateKey: key.private_key,
    serviceClient: process.env.NEXT_PUBLIC_GSUITE_CLIENT_ID || "",
    privateKey: process.env.NEXT_PUBLIC_GSUITE_PRIVATE_KEY || "",
  },
};

export const sendEmail = async (data: EmailPayload) => {
  //@ts-ignore
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: YOUR_EMAIL_ADDRESS,
    ...data,
  });
};
