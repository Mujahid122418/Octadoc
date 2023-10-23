const nodemailer = require("nodemailer");

const WellcomeSendEmail = async (options) => {
  console.log("options", options);
  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure:false,
   
    auth: {
      user: "mujahid122418@gmail.com",
      pass: "jixr xjei yuen jzox",
    },
  });

  const message = {
    // from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    from: { name: "GP Scribe", email: "mujahid122418@gmail.com" },

    to: options.email,
    // to: "developer.mujahid@gmail.com",

    subject: "Wellcome to GP Scribe ",
    text: "Wellcome to GP Scribe "
    
  };
  
   await transporter.sendMail(message , (err , info)=>{
    if(err){
      console.log("Message sent error: " , err);

    }else{
      console.log("Message sent:" , info);
    }
  });

 
};

module.exports = WellcomeSendEmail;
