
const router = require('express').Router();
const { google } = require("googleapis");
const jwt_decode = require("jwt-decode");

const OAuth2 = google.auth.OAuth2;
require('dotenv').config()

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET, 
  "http://localhost:3001/api/google/callback" // YOUR_REDIRECT_URL
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

router.get('/login', (req, res) => {
    res.redirect(authorizationUrl)
});

router.get('/callback/', async (req, res) => {
    const code = req.query.code;
    let { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    var user = jwt_decode(tokens.id_token);
    req.session.save(() => {
        req.session.tokens = tokens;
        req.session.googleEmail = user.email;
        res.redirect('/send-email');
    })
})

module.exports = router;