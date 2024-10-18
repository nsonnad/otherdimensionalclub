const fs = require('fs');
const path = require('path');
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Add a collection for the most recent notes
  // Add a collection for the most recent notes by last modified date
  eleventyConfig.addCollection('recentNotes', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/notes/*.md')
      .map(item => {
        const filePath = path.join(__dirname, item.inputPath);
        const stats = fs.statSync(filePath);
        item.data.lastModified = stats.mtime;
        return item;
      })
      .sort((a, b) => b.data.lastModified - a.data.lastModified)
      .slice(0, 4);
  });

  // Create a collection of all notes
  eleventyConfig.addCollection("allNotes", function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/notes/*.md')
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
  });

  eleventyConfig.addCollection("categoryList", function(collectionApi) {
    let categorySet = new Set();

    collectionApi.getFilteredByGlob('src/notes/*.md')
      .forEach(function(item) {
        if (item.data.categories) {
          item.data.categories.forEach(category => categorySet.add(category));
        }
      });
    return Array.from(categorySet).sort();
  });

  eleventyConfig.addCollection("categorizedPosts", function (collectionApi) {
    let categorizedPosts = {};

    collectionApi.getFilteredByGlob('src/notes/*.md').forEach(function (item) {
      if (item.data.categories) {
        item.data.categories.forEach((category) => {
          if (!categorizedPosts[category]) {
            categorizedPosts[category] = [];
          }
          categorizedPosts[category].push(item);
        });
      }
    });

    // Sort posts in each category by date
    for (let category in categorizedPosts) {
      categorizedPosts[category].sort((a, b) => a.date - b.date);
    }

    return categorizedPosts;
  });

  return {
    dir: {
      input: "src",
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
};
