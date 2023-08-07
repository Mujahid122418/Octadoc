const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("options", options);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: "sofia.frami@ethereal.email",
      pass: "RnFsjq731Nhdk77XyT",
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    // to: "developer.mujahid@gmail.com",

    subject: options.subject,
    text: options.message,
  };
  console.log("message", message);
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
