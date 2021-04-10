const winston = require("winston");

const formatMeta = (meta) => {
  const splat = meta[Symbol.for("splat")];
  return splat && splat.length
    ? splat.length === 1
      ? typeof splat[0] === "object"
        ? JSON.stringify(splat[0], null, 2)
        : splat[0]
      : JSON.stringify(splat, null, 2)
    : "";
};

module.exports = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.align(),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, timestamp, ...metadata }) =>
        `[${timestamp}] [${level}] ${message} ${formatMeta(metadata)}`
    )
  ),
  transports: [new winston.transports.Console()],
});