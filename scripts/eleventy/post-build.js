/**
 * Eleventy configuration for post-build tasks (post-build time)
 */

import { execSync } from "child_process";

export default function (eleventyConfig) {

    eleventyConfig.on('eleventy.after', () => {
        console.log("Post build TailwindCSS");
        execSync(`tailwindcss -i ./src/assets/stylesheets/main.css -o ./dist/assets/stylesheets/main.css --minify`);
    });

    // Search config with pagefind
    eleventyConfig.on('eleventy.after', () => {
        console.log("Post build pagefind");
        execSync(
            `npx pagefind --site dist --output-subdir _pagefind --exclude-selectors "img, video, audio, svg, source"`,
            { encoding: 'utf-8' });
        console.log("Pagefind done");
    });
}
