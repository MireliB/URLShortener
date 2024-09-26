const handleErrors = (req, res, next) => {
  console.log("asdasdasD", res.locals.error);
  return res.json({
    ok: false,
    message: res.locals.error?.message,
  });
};

module.exports = handleErrors;
