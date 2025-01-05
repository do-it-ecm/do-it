/**
 * Eleventy configuration for transforms (build time)
 */

import htmlmin from "html-minifier-terser";

export default function (eleventyConfig) {
    if (process.env.NODE_ENV === "production") {
        eleventyConfig.addTransform("htmlmin", async function (content) {
            let minified = content;
            if ((this.page.outputPath || "").endsWith(".html")) {
                try {
                    minified = await htmlmin.minify(content, {
                        useShortDoctype: true,
                        removeComments: true,
                        collapseWhitespace: true,
                        minifyCSS: true,
                        minifyJS: true,
                        noNewlinesBeforeTagClose: true,
                    });
                } catch (e) {
                    // Do nothing if the html-minifier fails
                }
            }
            return minified;
        });
    }
}
