const { DateTime } = require("luxon");

module.exports = {
  htmlDateString: (dateObj) => {
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  },
  readableDate: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  },
};
