const LOCAL_CACHE = require("../db/LocalDB");
let LOCAL_DELETE_DB = require("../db/LocalDeleteDB");
const { deleteByShortUrlId, getAllExpiredUrls } = require("../repos/url.repo");

// DB
// LOCAL_CAHCE -> COPY OF DB
// LOCAL_DELETE_DB -> [idToDelete1, idToDelete2, ...]

const initCleanup = async () => {
  const ONE_MINUTE = 1000 * 60;

  const allExpiredUrlsFromDB = (await getAllExpiredUrls()) || [];

  setInterval(() => {
    const URLS_TO_DELETE = [...allExpiredUrlsFromDB, ...LOCAL_DELETE_DB];

    URLS_TO_DELETE.forEach((obj) => {
      if (obj.isDeleted) return;

      const now = new Date();

      if (new Date(now) >= new Date(obj.dateToExpireUrl)) {
        deleteByShortUrlId(obj.base62Id).then(() => {
          const objInLocalDeleteDBIndex = LOCAL_DELETE_DB.findIndex(
            (deleteObj) => deleteObj.base62Id === obj.base62Id
          );
          if (objInLocalDeleteDBIndex >= 0) {
            LOCAL_DELETE_DB.splice(objInLocalDeleteDBIndex, 1);
          }

          const objInLocalUrlsToDeleteIndex = URLS_TO_DELETE.findIndex(
            (deleteObj) => deleteObj.base62Id === obj.base62Id
          );
          if (objInLocalUrlsToDeleteIndex >= 0) {
            URLS_TO_DELETE.splice(objInLocalUrlsToDeleteIndex, 1);
          }

          delete LOCAL_CACHE[obj.base62Id];

          obj.isDeleted = true;
        });
      }
    });
  }, ONE_MINUTE);
};

module.exports = initCleanup;
