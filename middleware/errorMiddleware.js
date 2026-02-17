module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);

  const status = err.status || 500;
  const message = err.message || "Server error";

  res.status(status).json({ message });
};
