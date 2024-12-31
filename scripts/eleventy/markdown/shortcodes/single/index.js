/**
 * Eleventy configuration for markdown shortcodes (build time)
 */

import setupSizedImage from './sizedImage.js'
import setupLienInterne from "./lieninterne.js";


export default function setupSingleShortcodes(eleventyConfig) {
    setupSizedImage(eleventyConfig)
    setupLienInterne(eleventyConfig)
}
