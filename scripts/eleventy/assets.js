/**
 * Eleventy configuration for assets copy in the output directory (build time)
 */

export default function (eleventyConfig) {
  const PASS_THROUGH_GLOBS = [
    "src/assets/node_modules",
  ];
  PASS_THROUGH_GLOBS.forEach((glob) => {
    eleventyConfig.addPassthroughCopy(glob);
  });
};
