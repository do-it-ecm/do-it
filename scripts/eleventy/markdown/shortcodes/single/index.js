/**
 * Eleventy configuration for markdown shortcodes (build time)
 */

import setupSizedImage from './sizedImage.js'

export default function setupShortcodes(eleventyConfig) {
    setupSizedImage(eleventyConfig)
}
