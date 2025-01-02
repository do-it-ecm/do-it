/**
 * Eleventy configuration for markdown (build time)
 */

import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItMultimdTable from "markdown-it-multimd-table";
import { escapeHtml } from "./shortcodes/paired/utils.js";

export default function (eleventyConfig) {
    let markdownItLibrary = markdownIt({
        html: true,
        breaks: false,
        linkify: true
    });

    // Customize the renderer for code blocks (fence)
    markdownItLibrary.renderer.rules.fence = function (tokens, idx) {
        const token = tokens[idx];
        const info = token.info ? token.info.trim() : ''; // Safely extract info
        const langName = info.split(/\s+/g)[0] || ''; // Get the language name

        // Add `language-[LANGUAGE]` and `line-numbers` classes
        const langClass = langName ? `language-${langName}` : '';
        const lineNumbersClass = 'line-numbers';
        const combinedClass = [langClass, lineNumbersClass].filter(Boolean).join(' ');

        // Render the code block
        return `<pre class="${combinedClass}"><code>${escapeHtml(token.content)}</code></pre>`;
    };

    // Add plugins
    markdownItLibrary
        .use(markdownItAttrs)
        .use(markdownItMultimdTable, {
            multiline: true,
            rowspan: true,
            headerless: true,
            multibody: true,
            aotolabel: true,
        });

    eleventyConfig.addFilter("md", function (content = "") {
        return markdownItLibrary.render(content);
    });

    // Set the customized library to Eleventy
    eleventyConfig.setLibrary("md", markdownItLibrary);
}
