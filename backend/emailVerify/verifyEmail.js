const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyEmail = async (token, email) => {
  try {
    console.log("===== EMAIL DEBUG =====");
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);
    console.log("Recipient:", email);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    console.log("Verifying SMTP...");
    await transporter.verify();
    console.log("✅ SMTP Connected");

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Test Email",
      html: "<h1>Hello from Harvi</h1>",
    });

    console.log("✅ Email sent");
    console.log(info);

  } catch (err) {
    console.error("EMAIL ERROR:");
    console.error(err);
  }
};

module.exports = verifyEmail;
