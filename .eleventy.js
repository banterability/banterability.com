const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const typogr = require("typogr");
const eleventyFeedPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const {
  localDateTime,
  monthDay,
  readableDate,
  relativeDate,
} = require("./filters/datetime");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyFeedPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true }).use(markdownItAnchor)
  );

  eleventyConfig.addFilter("typography", (templateContent) => {
    return typogr(templateContent).typogrify();
  });

  eleventyConfig.addFilter("limit", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("localDateTime", localDateTime);
  eleventyConfig.addFilter("monthDay", monthDay);
  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("relativeDate", relativeDate);

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addGlobalData("generatedAt", new Date());

  return {
    dir: { input: "src" },
  };
};
