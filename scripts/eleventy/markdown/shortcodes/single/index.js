/**
 * Eleventy configuration for markdown shortcodes (build time)
 */

import setupSizedImage from './sizedImage.js'
import setupLienInterne from "./lieninterne.js";
import setupTitle from "./title.js";


export default function (eleventyConfig) {
    setupSizedImage(eleventyConfig);
    setupLienInterne(eleventyConfig);
    setupTitle(eleventyConfig);
}
