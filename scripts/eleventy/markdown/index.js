/**
 * Eleventy configuration for markdown (build time)
 */

import markdownIt from "markdown-it"
import markdownItAttrs from "markdown-it-attrs"
import markdownItMultimdTable from "markdown-it-multimd-table"
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"

export default function (eleventyConfig) {

    let markdownItLibrary = markdownIt({
        html: true,
        breaks: false,
        linkify: true
    })

    markdownItLibrary
        .use(markdownItAttrs)
        .use(markdownItMultimdTable, {
            multiline: true,
            rowspan: true,
            headerless: true,
            multibody: true,
            aotolabel: true,
        });


    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        alwaysWrapLineHighlights: false,
    })

    // eleventyConfig.addPlugin(require("eleventy-plugin-mathjax"));

    eleventyConfig.addFilter("md", function (content = "") {
        return markdownItLibrary.render(content);
    });

    eleventyConfig.setLibrary("md", markdownItLibrary)

    // shortcodes(eleventyConfig);
};
