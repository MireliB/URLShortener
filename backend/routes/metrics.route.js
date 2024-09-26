const express = require("express");
const {
  findMostVisitedUrls,
  findMostConvertedUrls,
  findMostUsersByCountries,
} = require("../repos/url.repo");
const handleErrors = require("../middlewares/handle-errors");

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const threeMostVisitedUrls = await findMostVisitedUrls();
      const threeMostConvertedUrls = await findMostConvertedUrls();
      const mostUsersByCountries = await findMostUsersByCountries();

      res.json({
        ok: true,
        data: {
          mostVisitedUrls: threeMostVisitedUrls,
          mostConvertedUrls: threeMostConvertedUrls,
          mostUsersByCountries,
        },
      });
    } catch (error) {
      res.locals.error = error;
      console.log("An error has occurred on metrics/", error);
      next();
    }
  },
  handleErrors
);

module.exports = router;
