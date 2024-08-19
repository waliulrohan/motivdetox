// lib/emailTemplates.ts

export default function verificationCodeEmail(username, verifyCode){
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              .main { background-color: #f9f9f9; font-family: Arial, sans-serif; padding: 20px; }
              .container { margin: 0 auto; padding: 20px; max-width: 600px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 4px; }
              .heading { font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 20px; }
              .text { font-size: 16px; color: #333333; margin-bottom: 10px; }
              .code { font-size: 20px; font-weight: bold; color: #1a73e8; margin: 20px 0; }
          </style>
      </head>
      <body class="main">
          <div class="container">
              <h1 class="heading">Verification Code</h1>
              <p class="text">Hello ${username},</p>
              <p class="text">Your verification code is:</p>
              <p class="code">${verifyCode}</p>
              <p class="text">Please use this code to complete your registration.</p>
              <p class="text">This code will expire in 1 hour.</p>
              <p class="text">Thank you!</p>
          </div>
      </body>
      </html>
  `;
}
