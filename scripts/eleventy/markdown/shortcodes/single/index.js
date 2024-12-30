/**
 * Eleventy configuration for markdown shortcodes (build time)
 */

import setupSizedImage from './sizedImage.js'
import setupLienInterne from "./lieninterne.js";


export default function setupShortcodes(eleventyConfig) {
    setupSizedImage(eleventyConfig)
    setupLienInterne(eleventyConfig)
}
