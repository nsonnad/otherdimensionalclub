module.exports = function (eleventyConfig) {
  // Create a collection of all notes
  eleventyConfig.addCollection("allNotes", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      return item.inputPath.endsWith('.md');
    }).sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  eleventyConfig.addCollection("categoryList", function(collectionApi) {
    let categorySet = new Set();
    collectionApi.getAll().filter(item => {
      return item.inputPath.endsWith('.md');
    }).forEach(function(item) {
      if (item.data.categories) {
        item.data.categories.forEach(category => categorySet.add(category));
      }
    });
    return Array.from(categorySet).sort();
  });

  eleventyConfig.addCollection("categorizedPosts", function (collectionApi) {
    let categorizedPosts = {};
    collectionApi.getAll().forEach(function (item) {
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
