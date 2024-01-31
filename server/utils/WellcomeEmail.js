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
    from: { name: "GP.scribe", email: "mujahid122418@gmail.com" },

    to: options.email,
    // to: "developer.mujahid@gmail.com",

    subject: "Wellcome to GP.Scribe ",
    text: "Wellcome to GP.Scribe",
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
            <p class="secondParagraph">
            We're thrilled to welcome you to GP.Scribe! As a fellow GP, we understand the challenges you face with patient documentation. That's why we've designed GP.Scribe - a platform built by GPs, for GPs, to streamline the consultation process and make your life easier.
            With GP.Scribe, you'll have access to:
            </p>
            <br/>
            <ul>
            <li>Dynamic Forms: Clickable forms that prepopulate notes, enhancing efficiency.
          </li>
            <li>Customizable Templates: Tailor-made templates for individual consultation needs, ensuring comprehensive note-taking.
          </li>
            <li> User-Friendly Interface: Easy-to-navigate design, making it accessible for all GPs.
          </li>
          <li>
          Privacy and Security: Strong measures in place to protect patient information, with no data stored on our platform.
          
          </li>
          <li>
          Feature Requests: Option to request new templates or features, allowing the platform to evolve with your needs.
          </li>
          <li>
          We're offering you a 1-month free trial to explore all these features and see how GP.Scribe can transform your practice. After this trial period, your access will be restricted until you upgrade to either our monthly or annual plan.
          
          </li>
          
          
          
          </ul>
            <p class="secondParagraph">
            
            To get started, simply log in to your account and explore the platform. If you have any questions or need assistance, our support team is always here to help.

            
            </p>
           
            <br/>

            <p class="secondParagraph">
            We're excited to have you on board and can't wait to see how GP.Scribe can enhance your practice.

            </p>
        
            <p class="secondParagraph">
            Remember, GP.Scribe representatives will never ask you for your password, so please don't share it with anyone.
           </p>
              
           
          <br/>
          <p class="secondParagraph">
          Best,
          </p>
          <p class="secondParagraph">
          Dr Amna Hasan
          </p>
          <p class="secondParagraph">
          Founder, 

          </p>
          <p class="secondParagraph">
          GPScribe.au

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

module.exports = WellcomeSendEmail;
