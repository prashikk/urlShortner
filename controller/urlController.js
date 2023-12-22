const Url = require('../models/url');
const shortid = require('shortid');


// Function to generate a unique short URL
async function generateShortUrl() {
  const shortId = shortid.generate();
  return `http://localhost:4000/${shortId}`;
}

// Controller function to handle URL shortening
async function shortenUrl(req, res) {
  const { originalUrl } = req.body;

  try {
    // Check if the URL already exists in the database
    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      console.log('URL already exists in the database:', existingUrl);
      return res.json({
        originalUrl,
        shortUrl: existingUrl.shortUrl,
      });
    }

    // Generate a unique short URL
    const shortUrl = await generateShortUrl();

    // Create a new URL document and save it to the database
    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();

    console.log('URL shortened successfully:', newUrl);

    return res.json({
      originalUrl,
      shortUrl,
    });
  } catch (error) {
    console.error('Error in shortenUrl:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
// Controller function to handle redirecting to the original URL
async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    // Find the original URL based on the short URL
    const url = await Url.findOne({ shortUrl });

    if (url) {
      // Redirect to the original URL
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  shortenUrl,
  redirectUrl,
};
