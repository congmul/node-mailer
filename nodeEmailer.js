// const createTransporter = async () => {
//   const oauth2Client = new OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     "https://developers.google.com/oauthplayground"
//   );

//   oauth2Client.setCredentials({
//     refresh_token: process.env.REFRESH_TOKEN
//   });

//   // const accessToken = await new Promise((resolve, reject) => {
//   //   oauth2Client.getAccessToken((err, token) => {
//   //     if (err) {
//   //       reject();
//   //     }
//   //     resolve(token);
//   //   });
//   // });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       accessToken: 'ya29.a0AX9GBdV6cn8jBenGwRuHQHx56XaxLwTa_Yj1ikkD_C5rGwlji-pi7E-pmvp-5W5b08J8YPR5DmE8fn6UWQUfMunnfIeopBEHNsqfphLov0sF-Ed3tJGNeaAP2wmGN5bcNS-NI-soP2YnYGdqVPyZAHw_QjscaCgYKAUESARESFQHUCsbC5GszsJ05Mr2so7gWBhZVtg0163',
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refreshToken: process.env.REFRESH_TOKEN
//     }
//   });

//   return transporter;
// };

// //emailOptions - who sends what to whom
// const sendEmail = async (emailOptions) => {
//   try{
//     let emailTransporter = await createTransporter();
//     await emailTransporter.sendMail(emailOptions);
//   }catch(error){
//     console.log(error, 57);
//   }
// };
// sendEmail({
//   subject: "Test with Oauth",
//   text: "I am sending an email from nodemailer!",
//   to: "jehyunjung@gmail.com",
//   from: process.env.EMAIL
// });