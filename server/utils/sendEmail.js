const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("options", options);
  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    // secure:false,
   
    auth: {
      user: "mujahid122418@gmail.com",
      pass: "jixr xjei yuen jzox",
    },
  });

  const message = {
    // from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    from: { name: "GP.Scribe", email: "mujahid122418@gmail.com" },

    to: options.email,
    // to: "developer.mujahid@gmail.com",

    subject: "Verification Code GP.Scribe",
    text: "Please Click The Below Link To Verify Your Email Address",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .main {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            font-family: sans-serif;
            color: #000;
       
          }
    
          .container {
            max-width: 600px;
            width: 100%;
            padding: 0 30px;
          }
          .button {
          
            background-color: transparent;
            border: 1px solid transparent;
            border-radius: 15px;
            font-size: 15px;
            color: #000;
            font-weight:bold;
            width:fit-content;
          }
          a:link {
            color: #fff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: none;
          }
          h1 {
            text-align: center;
          }
          .firstParagraph {
            margin-top: 80px;
            margin-bottom: 30px;
            font-size: 20px;
          }
          .secondParagraph {
            margin-top: 15px;
            font-size: 15px;
          }
        </style>
      </head>
      <body>
        <div class="main">
          <div class="container">
            <h1>Dear ${options.email}</h1>
            <p class="secondParagraph">We received a request to reset your password for your GP.Scribe account. We're here to help! </p>
            <p class="secondParagraph">Enter the below OPT to create a new password:</p>
            <div class="button">${options.otp}</div>
            <br/>

            <p class="secondParagraph">
           If you didn't request this, please ignore this email. Your password won't change until you access the link above and create a new one.
            </p>
        
            <p class="secondParagraph">
            Remember, GP.Scribe representatives will never ask you for your password, so please don't share it with anyone.
           </p>
              
           <p class="secondParagraph">
           If you have any questions or need further assistance, feel free to contact our support team at support@gpscribe.au.
          </p>
          <br/>
          <p class="secondParagraph">
          Best,
          </p>
          <p class="secondParagraph">
          GP.Scribe Team
          </p>
          </div>
        </div>
      </body>
    </html>
    `,
  };
  
   await transporter.sendMail(message , (err , info)=>{
    if(err){
      console.log("Message sent error: " , err);

    }else{
      console.log("Message sent:" , info);
    }
  });

 
};

module.exports = sendEmail;
