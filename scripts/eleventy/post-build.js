/**
 * Eleventy configuration for post-build tasks (post-build time)
 */

import { execSync } from "child_process";

export default function (eleventyConfig) {

    eleventyConfig.on('eleventy.after', () => {
        execSync(`tailwindcss -i ./src/assets/stylesheets/main.css -o ./dist/assets/stylesheets/main.css --minify`)
    })

    // Search config with pagefind
    eleventyConfig.on('eleventy.after', () => {
        execSync(
            `npx pagefind --site dist --output-subdir _pagefind --exclude-selectors "img, video, audio, svg, source"`,
            { encoding: 'utf-8' })
    })
}
