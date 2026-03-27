const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyEmail = async (token, email) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",

      text: `Hi! There,

You recently registered on our website.

Please click the link below to verify your email:

process.env/verify/${token}

Thanks,
E-Kart Team`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("✅ Email Sent Successfully");
    console.log(info.response);

  } catch (error) {
    console.log("❌ Email Error:", error);
  }
};

module.exports = verifyEmail;