const { DateTime } = require("luxon");
const mainspring = require("mainspring");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const typogr = require("typogr");
const eleventyFeedPlugin = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyFeedPlugin);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true }).use(markdownItAnchor)
  );

  eleventyConfig.addFilter("fixTypography", (templateContent) => {
    return typogr(templateContent).typogrify();
  });

  eleventyConfig.addFilter("limit", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLL dd, yyyy")
  );

  eleventyConfig.addFilter("monthDay", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLL dd")
  );

  eleventyConfig.addFilter("localDateTime", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" })
      .setZone("America/Chicago")
      .toFormat("LLL dd, yyyy")
  );

  eleventyConfig.addFilter("relativeDate", (dateObj) => {
    const daysAgo = mainspring(dateObj).days;
    let value;
    let units;
    if (daysAgo > 365) {
      value = Math.floor(daysAgo / 365);
      units = "year";
    } else if (daysAgo > 30) {
      value = Math.floor(daysAgo / 31);
      units = "month";
    } else if (daysAgo > 7) {
      value = Math.floor(daysAgo / 7);
      units = "week";
    } else if (daysAgo > 1) {
      value = daysAgo;
      units = "day";
    } else {
      return `today`;
    }
    return `${value} ${units}${value === 1 ? "" : "s"} ago`;
  });

  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/styles");

  eleventyConfig.addGlobalData("generatedAt", new Date());

  return {
    dir: { input: "src" },
  };
};
