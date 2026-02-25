module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof require("../utils/api-error")) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Unexpected server error",
  });
};
