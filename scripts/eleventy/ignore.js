/**
 * Eleventy configuration for ignoring files
 */

export default function (eleventyConfig) {
    const IGNORE_GLOBS = [
        "**/README.md",
        "**/CHANGELOG.md",
        "**/LICENSE.md",
        "**/CONTRIBUTING.md",
        "**/.github/**",
        "**/assets/**",
        "src/!(assets)/**/node_modules"
    ];
    IGNORE_GLOBS.forEach((glob) => {
        eleventyConfig.ignores.add(glob);
    });
}
