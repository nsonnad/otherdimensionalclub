const slugify = require("./src/_includes/filters/slugify");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("slugify", slugify);

// In your .eleventy.js file
eleventyConfig.addCollection("categoryList", function(collectionApi) {
  let categorySet = new Set();
  collectionApi.getAll().forEach(function(item) {
    if (item.data.category) {
      item.data.category.forEach(category => categorySet.add(category));
    }
  });
  return Array.from(categorySet).sort();
});

eleventyConfig.addCollection("categorizedPosts", function (collectionApi) {
  let categorizedPosts = {};
  collectionApi.getAll().forEach(function (item) {
    if (item.data.category) {
      item.data.category.forEach((category) => {
        if (!categorizedPosts[category]) {
          categorizedPosts[category] = [];
        }
        categorizedPosts[category].push(item);
      });
    }
  });

  // Sort posts in each category by date
  for (let category in categorizedPosts) {
    categorizedPosts[category].sort((a, b) => b.date - a.date);
  }

  console.log(
    "Categorized posts:",
    Object.keys(categorizedPosts).map(
      (cat) => `${cat}: ${categorizedPosts[cat].length} posts`
    )
  );
  return categorizedPosts;
});

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
};
