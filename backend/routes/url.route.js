const express = require("express");
const { onConvertAttempt, deleteUrl } = require("../services/url.service");
const {
  updateMetricsByBase62Id,
  deleteByShortUrlId,
} = require("../repos/url.repo");
const checkExistingUrlById = require("../middlewares/check-existing-url-by-id");
const handleErrors = require("../middlewares/handle-errors");
const checkExistingUrlByShortUrl = require("../middlewares/check-existing-url-by-short-url");

const router = express.Router();

router.post(
  "/convert",
  async (req, res, next) => {
    try {
      const longUrl = req.body.url?.trim();
      const minutesToExpireIn = req.body.minutesToExpireIn;
      const userIp =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      if (!longUrl || !longUrl.length) {
        return res.json({
          ok: false,
          message: "No url was provided",
        });
      }

      const response = await onConvertAttempt(
        longUrl,
        minutesToExpireIn,
        userIp
      );

      return res.json(response);
    } catch (error) {
      res.locals.error = error;
      console.log("An error has occurred on /convert", error);
      next();
    }
  },
  handleErrors
);

router.get(
  "/tiny/:id",
  checkExistingUrlById,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const urlObj = res.locals.urlObj;

      updateMetricsByBase62Id(id, "visited");

      res.redirect(urlObj.longUrl);
    } catch (error) {
      console.log("An error has occurred on /tiny", error);
      next(error);
    }
  },
  handleErrors
);

router.get(
  "/:id",
  checkExistingUrlById,
  async (req, res, next) => {
    try {
      const urlObj = res.locals.urlObj;

      return res.json({
        ok: true,
        data: urlObj,
      });
    } catch (error) {
      console.log("An error has occurred on /tiny", error);
      next(error);
    }
  },
  handleErrors
);

router.delete(
  "/",
  checkExistingUrlByShortUrl,
  async (req, res, next) => {
    try {
      const shortUrlId = res.locals.shortUrlId;

      await deleteUrl(shortUrlId);

      return res.json({
        ok: true,
      });
    } catch (error) {
      console.log("An error has occurred on delete /url", error);
      next(error);
    }
  },
  handleErrors
);

module.exports = router;
