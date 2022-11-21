const { DateTime } = require("luxon");

const localDateTime = (dateObj) =>
  DateTime.fromJSDate(dateObj, { zone: "utc" })
    .setZone("America/Chicago")
    .toFormat("LLL dd, yyyy");

const monthDay = (dateObj) =>
  DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLL dd");

const readableDate = (dateObj) =>
  DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLL dd, yyyy");

const relativeDate = (dateObj) => {
  let delta = DateTime.now()
    .diff(DateTime.fromJSDate(dateObj, { zone: "utc" }), [
      "years",
      "months",
      "days",
    ])
    .toObject();

  console.log(delta);

  let unit;
  let value;

  if (delta.years) {
    unit = "year";
    value = delta.years;
  } else if (delta.months) {
    unit = "month";
    value = delta.months;
  } else if (delta.days <= 2) {
    if (delta.days <= 1) {
      return "today";
    } else {
      return "yesterday";
    }
  } else {
    unit = "day";
    value = delta.days;
  }

  return `${Math.floor(value)} ${unit}${
    Math.floor(value) === 1 ? "" : "s"
  } ago`;
};

module.exports = {
  localDateTime,
  monthDay,
  readableDate,
  relativeDate,
};

