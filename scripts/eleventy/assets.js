/**
 * Eleventy configuration for assets copy in the output directory (build time)
 */

export default function (eleventyConfig) {
  const PASS_THROUGH_GLOBS = [
    "src/**/*.{jpg,png,ico,pdf,svg,gif,webp}",
    "src/**/*.{txt,edi,csv,json,pdf,zip}",
    "src/**/*.{webm,mov,mp4,ogv}",
  ];
  if (process.env.NODE_ENV !== "production") {
    PASS_THROUGH_GLOBS.forEach((glob) => {
      eleventyConfig.addPassthroughCopy(glob);
    });
  }
};
