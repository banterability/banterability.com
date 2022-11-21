const typogr = require("typogr");

const typography = (templateContent) => typogr(templateContent).typogrify();

module.exports = {
  typography,
};
