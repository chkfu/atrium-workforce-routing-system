import nodemailer from 'nodemailer';

export const node_mailing = async function (options: {
  email: string;
  subject: string;
  message: string;
}) {
  //  remarks: transport setup
  //  remarks: transport as mailtrap provided details
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST as string,
    port: Number(process.env.MAILTRAP_PORT as string),
    auth: {
      user: process.env.MAILTRAP_USERNAME as string,
      pass: process.env.MAILTRAP_PASSWORD as string,
    },
  });

  //  remarks: options configs
  const mailing_opts = {
    from: `Atrium <${process.env.GMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //  remarks: action
  await transport.sendMail(mailing_opts);
};
