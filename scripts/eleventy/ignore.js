/**
 * Eleventy configuration for ignoring files
 */

export default function (eleventyConfig) {
    const IGNORE_GLOBS = [
        "**/README.md",
        "**/CHANGELOG.md",
        "**/LICENSE",
        "**/CONTRIBUTING.md",
        "**/.github/**",
        "**/assets/**",
        "**/node_modules/**",
        "**/.gitignore",
    ];
    IGNORE_GLOBS.forEach((glob) => {
        eleventyConfig.ignores.add(glob);
    });
}
