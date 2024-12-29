/**
 * Eleventy configuration for plugins (build time)
 */

import { EleventyRenderPlugin, EleventyHtmlBasePlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
    const PLUGINS = [
        EleventyRenderPlugin,
        EleventyHtmlBasePlugin,
        eleventyNavigationPlugin,
        syntaxHighlight,
    ];
    PLUGINS.forEach((plugin) => {
        eleventyConfig.addPlugin(plugin);
    });

}
