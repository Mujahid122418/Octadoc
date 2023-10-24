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
    from: { name: "GP Scribe", email: "mujahid122418@gmail.com" },

    to: options.email,
    // to: "developer.mujahid@gmail.com",

    subject: "Verification Code GP Scribe App",
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
            <h1>Confirm Your Email</h1>
            <p class="firstParagraph">Please use the following code to confirm your account. </p>
            <div class="button">${options.otp}</div>
            <br/>
            <p class="secondParagraph">
             Thank you
            </p>
        
            <p class="secondParagraph">
            GP Scribe
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
