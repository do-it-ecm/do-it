/**
 * Eleventy configuration for assets copy in the output directory (build time)
 */

export default function (eleventyConfig) {
  const PASS_THROUGH_GLOBS = [
    "src/**/*.{jpg,png,ico,svg,gif,webp}",
    "src/**/*.{webm,mov,mp4,ogv}",
  ];

  eleventyConfig.addPassthroughCopy({
    'src/assets/img/logo/favicon.ico': 'favicon.ico',
  });

  if (process.env.NODE_ENV !== "production") {
    PASS_THROUGH_GLOBS.forEach((glob) => {
      eleventyConfig.addPassthroughCopy(glob);
    });
  }
};
