/**
 * Eleventy configuration for plugins (build time)
 */

import { execSync } from "child_process";
import path from "path";
import { EleventyRenderPlugin, EleventyHtmlBasePlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import urls from "@11ty/posthtml-urls";

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

    // PostHTML URL transforms (convert relative URLs to raw github URLs)
    if (process.env.NODE_ENV === "production") {
        const RAW_GITHUB_BASE = "https://raw.githubusercontent.com";
        const GITHUB_REPO_OWNER = "do-it-ecm";
        const IS_PROMO_PATH = /src\/promos\/(\d{4}-\d{4})(\/?.*)?/;
        const COMMIT_REF = "refs/heads/main"; // Don't bother finding the commit ref for each submodule, just use main

        function mediaUrlTransform(context) {
            const urlsOptions = {
                eachURL: function (url, attr, tagName) {
                    if (url.includes("://")) {
                        return url; // Don't transform external URLs
                    } else if (url.startsWith("/")) { // Absolute url, unused at the time of writing and somewhat annoying to deal with, skip for now
                        console.log(`Skipping absolute URL: ${url}`);
                        return url;
                    } else { // Hopefully valid relative URL
                        const baseDir = process.cwd();
                        const absoluteDirPath = path.dirname(path.resolve(baseDir, path.dirname(context.inputPath), url));

                        const promoMatch = absoluteDirPath.match(IS_PROMO_PATH);
                        let remoteUrl = "";
                        if (promoMatch) {
                            // Promo path
                            const promoYear = promoMatch[1];
                            // Retrieve relative path (remove trailing slash)
                            const relativePath = promoMatch[2] ? promoMatch[2].replace(/\/$/, "") : "";
                            remoteUrl = `${RAW_GITHUB_BASE}/${GITHUB_REPO_OWNER}/promo-${promoYear}/${COMMIT_REF}/${relativePath}/${path.basename(url)}`;
                        } else {
                            const relativePath = path.relative(baseDir, absoluteDirPath);
                            remoteUrl = `${RAW_GITHUB_BASE}/${GITHUB_REPO_OWNER}/do-it/${COMMIT_REF}/${relativePath}/${path.basename(url)}`;
                        }

                        return remoteUrl;
                    }
                },
                filter: {
                    img: { src: true, srcset: true },
                    video: { src: true, srcset: true },
                    audio: { src: true },
                    source: { src: true, srcset: true }
                }
            };
            return urls(urlsOptions);
        }
        eleventyConfig.htmlTransformer.addPosthtmlPlugin("html", mediaUrlTransform, { priority: -1 });
    } else {
        console.warn("Skipping media URL transform in development mode");
    }
}
