const router = require('express').Router();

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
      res.render('home');
    } catch (err) {
      res.status(500).json(err);
    }
});

// get all posts for homepage
router.get('/send-email', async (req, res) => {
    try {
        res.render('send-email', {tokens: req.session.tokens, userEmail: req.session.googleEmail });
    } catch (err) {
      console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;