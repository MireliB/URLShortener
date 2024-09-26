const LOCAL_CACHE = require("../db/LocalDB");
const {
  findByBase62Id,
  updateMetricsByBase62Id,
  saveUrl,
  deleteByShortUrlId,
} = require("../repos/url.repo");
const LOCAL_DELETE_DB = require("../db/LocalDeleteDB");

const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const onConvertAttempt = async (longUrl, minutesToExpireIn, userIp) => {
  const base62Id = getUrlInBase62(longUrl);

  const existUrlByBase64Id =
    LOCAL_CACHE[base62Id] || (await findByBase62Id(base62Id));

  if (existUrlByBase64Id) {
    updateMetricsByBase62Id(base62Id, "converted");

    return {
      ok: true,
      data: existUrlByBase64Id.shortUrl,
    };
  }

  const shortUrl = generateShortUrl(base62Id);

  const dateToExpireUrl = getDateToExpireUrl(minutesToExpireIn);

  if (dateToExpireUrl) saveIdToDeleteDB(base62Id, dateToExpireUrl);

  const country = await getCountryByIp(userIp);

  saveToCache(base62Id, longUrl, shortUrl, dateToExpireUrl);

  saveUrl(base62Id, shortUrl, longUrl, dateToExpireUrl, country);

  return {
    ok: true,
    data: shortUrl,
  };
};

const saveIdToDeleteDB = (base62Id, dateToExpireUrl) => {
  LOCAL_DELETE_DB.push({
    base62Id,
    dateToExpireUrl: new Date(dateToExpireUrl),
  });
};

const deleteUrl = async (shortUrlId) => {
  await deleteByShortUrlId(shortUrlId);
  delete LOCAL_CACHE[shortUrlId];
};

const getDateToExpireUrl = (minutesToExpireIn) => {
  if (!minutesToExpireIn || Number.isNaN(minutesToExpireIn)) return;

  const d1 = new Date();
  const d2 = new Date(d1);

  const date = d2.setMinutes(d1.getMinutes() + Number(minutesToExpireIn));
  return date;
};

const numToBase62 = (num) => {
  let encoded = "";
  while (num > 0) {
    encoded = base62[Number(num % 62n)] + encoded;
    num = num / 62n;
  }
  return encoded;
};

const getUrlInBase62 = (str) => {
  const num = BigInt("0x" + Buffer.from(str).toString("hex"));
  return numToBase62(num);
};

const generateShortUrl = (base62Id) => {
  return `http://localhost:4000/url/tiny/${base62Id}`;
};

const saveToCache = (base62Id, longUrl, shortUrl) => {
  LOCAL_CACHE[base62Id] = {
    shortUrl,
    longUrl,
  };
};

const getCountryByIp = async (userIp) => {
  const ip = userIp.split(",")[0].trim();

  const url = `https://ipapi.co/${"147.235.220.17"}/country_name/`;
  // const url = `https://ipapi.co/${ip}/country_name/`;

  const res = await fetch(url);

  return await res.text();
};

module.exports = {
  onConvertAttempt,
  getUrlInBase62,
  deleteUrl,
};
