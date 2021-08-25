const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyFeedPlugin = require("@11ty/eleventy-plugin-rss");

const { head, min } = require("./_filters/collections");
const { htmlDateString, readableDate } = require("./_filters/dateTime");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("head", head);
  eleventyConfig.addFilter("htmlDateString", htmlDateString);
  eleventyConfig.addFilter("min", min);
  eleventyConfig.addFilter("readableDate", readableDate);

  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("styles");

  eleventyConfig.addPlugin(eleventyFeedPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
};
