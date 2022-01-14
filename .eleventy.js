const { DateTime } = require("luxon");
const eleventyFeedPlugin = require("@11ty/eleventy-plugin-rss");
const generateHeadingIds = require("@orchidjs/eleventy-plugin-ids");
const readingTime = require("reading-time");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyFeedPlugin);
  eleventyConfig.addPlugin(generateHeadingIds);

  eleventyConfig.addFilter("published", (posts) => {
    console.log("inside published", posts);
    return posts.filter((post) => !post.data.draft);
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

  eleventyConfig.addFilter("readingTime", (templateContent) =>
    Math.ceil(readingTime(templateContent).minutes)
  );

  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/styles");

  eleventyConfig.addGlobalData("generatedAt", new Date());

  return {
    dir: { input: "src" },
  };
};
