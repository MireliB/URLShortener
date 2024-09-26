const UrlModel = require("../models/Url.model");

const saveUrl = async (
  base62Id,
  shortUrl,
  longUrl,
  dateToExpireUrl,
  country
) => {
  await UrlModel.create({
    base62Id,
    shortUrl,
    longUrl,
    dateToExpireUrl,
    country,
  });
};

const findByBase62Id = async (base62Id) => {
  return await UrlModel.findOne({
    base62Id,
  });
};

const updateMetricsByBase62Id = async (base62Id, key) => {
  await UrlModel.findOneAndUpdate(
    {
      base62Id,
    },
    {
      $inc: {
        [key]: 1,
      },
    }
  );
};

const findMostVisitedUrls = async () => {
  return await UrlModel.find({}, "-_id").sort({ visited: -1 }).limit(3);
};

const findMostConvertedUrls = async () => {
  return await UrlModel.find({}, "-_id").sort({ converted: -1 }).limit(3);
};

const findMostUsersByCountries = async () => {
  return await UrlModel.aggregate([
    {
      $match: {
        country: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 3,
    },
  ]);
};

const findByShortUrl = async (shortUrlId) => {
  return await UrlModel.findOne({ base62Id: shortUrlId });
};

const deleteByShortUrlId = async (shortUrlId) => {
  return await UrlModel.deleteOne({ base62Id: shortUrlId });
};

const getAllExpiredUrls = async () => {
  return await UrlModel.find({ dateToExpireUrl: { $lte: new Date() } });
};

module.exports = {
  saveUrl,
  findByBase62Id,
  updateMetricsByBase62Id,
  findMostVisitedUrls,
  findMostConvertedUrls,
  findByShortUrl,
  deleteByShortUrlId,
  getAllExpiredUrls,
  findMostUsersByCountries,
};
