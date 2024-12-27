/**
 * Eleventy configuration for markdown shortcodes (build time)
 */

import setupPairedShortCodes from "./paired/index.js";
import setupSingleShortCodes from "./single/index.js";

export default function setupShortcodes(eleventyConfig) {
    setupPairedShortCodes(eleventyConfig);
    setupSingleShortCodes(eleventyConfig);
}
