const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Routes
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/shorten', urlController.createShortUrl);

router.get('/:code', urlController.redirectToOriginal);

module.exports = router;
