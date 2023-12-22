const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController');


// Route to handle URL shortening
router.post('/shorten', urlController.shortenUrl);

// Route to handle redirecting to the original URL
router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
  
    try {
      // Find the original URL based on the short URL
      const url = await Url.findOne({ shortUrl });
  
      if (url) {
        // Redirect to the original URL
        return res.redirect(url.originalUrl);
      } else {
        // Handle case where short URL is not found
        return res.status(404).json({ error: 'Short URL not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;