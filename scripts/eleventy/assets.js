/**
 * Eleventy configuration for assets copy in the output directory (build time)
 */

export default function (eleventyConfig) {
  // Keep the assets node_modules in the output directory
  eleventyConfig.addPassthroughCopy("src/assets/node_modules");
  eleventyConfig.ignores.add("src/!(assets)/**/node_modules");
};
