
const router = require('express').Router();
const { google } = require("googleapis");
const jwt_decode = require("jwt-decode");

const OAuth2 = google.auth.OAuth2;
require('dotenv').config()

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET, 
  process.env.REDIRECT_URL, // YOUR_REDIRECT_URL
);

// Access scopes for google mail service.
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

// After varifying your credential, redirecting to here with code
// It will retrieve tokens from the code.
router.get('/callback/', async (req, res) => {
    const code = req.query.code;
    // Should use await keyword to get tokens properly.
    let { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    var googleUserInfo = jwt_decode(tokens.id_token);
    req.session.save(() => {
        req.session.tokens = tokens;
        req.session.googleEmail = googleUserInfo.email;
        res.redirect('/send-email');
    })
})

module.exports = router;