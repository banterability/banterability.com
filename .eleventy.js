const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const eleventyFeedPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const {
  localDateTime,
  monthDay,
  readableDate,
  relativeDate,
} = require("./filters/datetime");
const { typography } = require("./filters/typography");
const { limit } = require("./filters/util");

module.exports = function (config) {
  config.setLibrary("md", markdownIt({ html: true }).use(markdownItAnchor));

  config.addPlugin(eleventyFeedPlugin);
  config.addPlugin(syntaxHighlight);

  config.addFilter("limit", limit);
  config.addFilter("localDateTime", localDateTime);
  config.addFilter("monthDay", monthDay);
  config.addFilter("readableDate", readableDate);
  config.addFilter("relativeDate", relativeDate);
  config.addFilter("typography", typography);

  config.addPassthroughCopy("src/assets");

  config.addGlobalData("generatedAt", new Date());

  return {
    dir: { input: "src" },
  };
};
