import setupMarkdown from './scripts/eleventy/markdown/index.js';
import setupShortcodes from "./scripts/eleventy/markdown/shortcodes/index.js";
import assetsConfig from "./scripts/eleventy/assets.js";
import filtersConfig from "./scripts/eleventy/filters.js";
import collectionsConfig from "./scripts/eleventy/collections.js";
import postCompilation from "./scripts/eleventy/post-build.js";
import setupPlugins from "./scripts/eleventy/plugins.js";
import setupIgnore from "./scripts/eleventy/ignore.js";

export default function (eleventyConfig) {

  // Compute eleventyNavigationBreadcrumb only in production (significant performance gain)
  eleventyConfig.addGlobalData("navigation", process.env.NODE_ENV === "production" || process.env.NAV === "true");

  setupPlugins(eleventyConfig);
  setupMarkdown(eleventyConfig);
  setupShortcodes(eleventyConfig);
  assetsConfig(eleventyConfig);
  setupIgnore(eleventyConfig);
  filtersConfig(eleventyConfig);
  collectionsConfig(eleventyConfig);
  postCompilation(eleventyConfig); // tailwind and search

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
  };
};
