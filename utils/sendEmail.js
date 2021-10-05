import nodemailer from "nodemailer";

const sendEmail = (options) => {
  const transpoter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var message = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  transpoter.sendMail(message, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

export default sendEmail;
