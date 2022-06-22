const typogr = require("typogr");

module.exports = {
  typography: (templateContent) => typogr(templateContent).typogrify();
}
