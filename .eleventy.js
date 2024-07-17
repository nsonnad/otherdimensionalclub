module.exports = function(eleventyConfig) {
  // Set input and output directories
  return {
    dir: {
      input: "src",
      layouts: "_includes/layouts",
      output: "_site"
    }
  };
};
