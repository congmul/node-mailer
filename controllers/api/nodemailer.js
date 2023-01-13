const router = require('express').Router();
const nodemailer = require("nodemailer");
require('dotenv').config()

// '/api/nodemailer/send'
router.post('/send', async (req, res) => {
    const {sender, receiver, subject, content} = req.body;
    console.log({sender, receiver, subject, content});
    const {access_token, refresh_token} = req.session.tokens;
    const email = req.session.googleEmail
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        type: "OAuth2",
        user: email,
        accessToken: access_token,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: refresh_token
        }
    });
       
    try{
        await transporter.sendMail({
            subject: subject,
            text: content,
            to: receiver,  // ["example@email.com", "example2@email.com"]
            from: email
        });

        res.status(200).json("Sent");

    }catch(error){        
        res.status(500).json(error);
    };
});

module.exports = router;