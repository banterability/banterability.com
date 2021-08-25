const {DateTime} = require('luxon');
module.exports = function(eleventyConfig) {	
	eleventyConfig.setDataDeepMerge(true);
	
	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
	  });
	
	  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	  });
	
	  // Get the first `n` elements of a collection.
	  eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
		  return [];
		}
		if( n < 0 ) {
		  return array.slice(n);
		}
	
		return array.slice(0, n);
	  });
	
	  // Return the smallest number argument
	  eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	  });
	  function filterTagList(tags) {
		  return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
		}
	  
		eleventyConfig.addFilter("filterTagList", filterTagList)
	
	  eleventyConfig.addPassthroughCopy("fonts");
	  eleventyConfig.addPassthroughCopy("styles");
	};