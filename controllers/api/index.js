const router = require('express').Router();

const googleAuthRoutes = require('./google-auth');
const nodemailerRoutes = require('./nodemailer');

router.use('/google', googleAuthRoutes);
router.use('/nodemailer', nodemailerRoutes);

module.exports = router;