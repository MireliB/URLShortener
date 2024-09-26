const LOCAL_CACHE = require("../db/LocalDB");
const { findByShortUrl } = require("../repos/url.repo");

const checkExistingUrlByShortUrl = async (req, res, next) => {
  const { shortUrlId } = req.query;

  if (!shortUrlId) {
    return res.json({
      ok: false,
      message: "No url was provided",
    });
  }

  const urlObj = LOCAL_CACHE[shortUrlId] || (await findByShortUrl(shortUrlId));

  if (!urlObj) {
    return res.json({
      ok: false,
      message: "Couldn't find any long URLs related to the provided short url",
    });
  }

  res.locals.shortUrlId = shortUrlId;
  next();
};

module.exports = checkExistingUrlByShortUrl;
