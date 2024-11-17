const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');

// Create short URL
exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = 'http://PAARTH';

  // Check if the URL is valid
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json('Invalid URL');
  }

  try {
    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.render('result', { shortUrl: url.shortUrl });
    }

    // Create URL code and short URL
    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    // Save to database
    url = new Url({
      originalUrl,
      shortUrl,
      urlCode,
    });

    await url.save();
    res.render('result', { shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};

// Redirect to original URL
exports.redirectToOriginal = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};
