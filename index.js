const express = require('express');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jehyunjung@gmail.com',
        pass: 'fxujpkivcdtpcrkt'
    }
});

send();

async function send() {
    const result = await transporter.sendMail({
        from: 'YOUR-USERNAME',
        to: 'RECEIVERS',
        subject: 'Hello World',
        text: 'Hello World'
    });

    console.log(JSON.stringify(result, null, 4));
}

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
