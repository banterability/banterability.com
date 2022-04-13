const { DateTime } = require("luxon");
const eleventyFeedPlugin = require("@11ty/eleventy-plugin-rss");
const readingTime = require("reading-time");
const mainspring = require("mainspring");
const typogr = require("typogr");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyFeedPlugin);

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options).use(markdownItAnchor);

  eleventyConfig.setLibrary("md", markdownLib);

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

  eleventyConfig.addFilter("readingTime", (templateContent) =>
    Math.ceil(readingTime(templateContent).minutes)
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
