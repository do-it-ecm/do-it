/**
 * Eleventy configuration for post-build tasks (post-build time)
 */

import { execSync } from "child_process";

export default function (eleventyConfig) {

    // Post build TailwindCSS
    eleventyConfig.on('eleventy.after', () => {
        console.log("Post build TailwindCSS");
        execSync(`tailwindcss -i ./src/assets/stylesheets/main.css -o ./dist/assets/stylesheets/main.css --minify`);
    });

    if (process.env.NODE_ENV === "production") {
        // Search config with pagefind
        eleventyConfig.on('eleventy.after', () => {
            console.log("Post build pagefind");
            execSync(
                `npx pagefind --site dist --output-subdir _pagefind --exclude-selectors "img, video, audio, svg, source"`,
                { encoding: 'utf-8' });
            console.log("Pagefind done");
        });

        // Add gzip compression
        eleventyConfig.on('eleventy.after', () => {
            console.log("Post build gzip");
            execSync(`find ./dist -type f \\( -name "*.html" -o -name "*.css" -o -name "*.js" \\) -exec gzip -k -9 {} \\;`);
            console.log("Gzip done");
        });
    }
}
