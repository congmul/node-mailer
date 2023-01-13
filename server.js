const express = require('express');
const path = require('path')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config()

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  // "https://developers.google.com/oauthplayground"  // YOUR_REDIRECT_URL
  "http://localhost:3001/google/callback"
);

// Access scopes for read-only Drive activity.
const scopes = [
  'https://mail.google.com/'
];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});

const app = express();
const PORT = process.env.PORT || 3001;

// for parsing application/json
app.use(express.json()); 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));

app.post('/api/user/', (req, res) => {
  console.log(req.body)
})

app.get('/google/callback/', async (req, res) => {
  const code = req.query.code;
  let { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: 'jehyunjung@gmail.com',
      accessToken: tokens.access_token,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: tokens.refresh_token
    }
  });
    const sendEmail = async (emailOptions) => {
    try{
      await transporter.sendMail(emailOptions);
    }catch(error){
      console.log(error, 57);
    }
  };
  sendEmail({
    subject: "Test with Oauth",
    text: "I am sending an email from nodemailer!",
    to: "jehyunjung@gmail.com",
    from: "jehyunjung@gmail.com"
  });
  res.json({tokens})
})

app.get('/', (req, res) => {
  console.log("access");
  console.log(authorizationUrl, 57);
  res.redirect(authorizationUrl);
  // res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
