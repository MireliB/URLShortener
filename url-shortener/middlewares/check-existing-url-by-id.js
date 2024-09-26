const LOCAL_CACHE = require("../db/LocalDB");
const { findByBase62Id } = require("../repos/url.repo");

const checkExistingUrlById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      ok: false,
      message: "No id was provided",
    });
  }

  const urlObj = LOCAL_CACHE[id] || (await findByBase62Id(id));

  if (!urlObj) {
    return res.json({
      ok: false,
      message: "Couldn't find any long URLs related to the provided short url",
    });
  }

  res.locals.urlObj = urlObj;
  next();
};

module.exports = checkExistingUrlById;
