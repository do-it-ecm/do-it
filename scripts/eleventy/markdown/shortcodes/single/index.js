/**
 * Eleventy configuration for markdown shortcodes (build time)
 */

import setupSizedImage from './sizedImage.js'
import setupLienInterne from "./lienInterne.js";
import setupTitle from "./title.js";
import setupCurrentYear from "./currentYear.js";

export default function (eleventyConfig) {
    setupSizedImage(eleventyConfig);
    setupLienInterne(eleventyConfig);
    setupTitle(eleventyConfig);
    setupCurrentYear(eleventyConfig);
}
