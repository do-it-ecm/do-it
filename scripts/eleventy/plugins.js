/**
 * Eleventy configuration for plugins (build time)
 */

import path from "path";
import { EleventyRenderPlugin, EleventyHtmlBasePlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import urls from "@11ty/posthtml-urls";
import sitemap from "@quasibit/eleventy-plugin-sitemap";

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

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://do-it.aioli.ec-m.fr",
    },
  });

  // PostHTML URL transforms (convert relative URLs to raw github URLs)
  if (process.env.NODE_ENV === "production") {

    // DO NOT REMOVE THOSE CONSTANTS,
    // PERFORMING A GIT REMOTE -V OPERATION ON EACH FILE IS TOO EXPENSIVE
    // HARDCODED VALUES ARE FINE IN OUR CONTEXT

    // Raw GitHub URL constants
    const RAW_GITHUB_BASE = "https://raw.githubusercontent.com";
    // Repositories owner
    const GITHUB_REPO_OWNER = "do-it-ecm";
    // Regex to match promo paths (and extract the promo year and relative path)
    const IS_PROMO_PATH = /src\/promos\/(\d{4}-\d{4})(\/?.*)?/;
    // Regex to match the CS paths (and extract the relative path)
    const IS_CS_PATH = /src\/cs\/(.*)/;
    // Commit ref to use for all submodules
    const COMMIT_REF = "refs/heads/main"; // Don't bother finding the commit ref for each submodule, just use main

    function mediaUrlTransform(context) {
      const urlsOptions = {
        eachURL: function (url, attr, tagName) {
          let remoteUrl = url;
          if (url.includes("://")) {
            // Don't transform external URLs
          } else { // Hopefully valid relative URL
            const baseDir = process.cwd();
            let absoluteDirPath = "";
            if (url.startsWith("/")) {
              url = url.slice(1);
              absoluteDirPath = path.dirname(path.resolve(baseDir, "src", url));
            } else {
              absoluteDirPath = path.dirname(path.resolve(baseDir, path.dirname(context.inputPath), url));
            }
            const promoMatch = absoluteDirPath.match(IS_PROMO_PATH);
            if (promoMatch) {
              // Promo path
              const promoYear = promoMatch[1];
              // Retrieve relative path (remove trailing slash)
              const relativePath = promoMatch[2] ? promoMatch[2].replace(/\/$/, "") : "";
              remoteUrl = `${RAW_GITHUB_BASE}/${GITHUB_REPO_OWNER}/promo-${promoYear}/${COMMIT_REF}/${relativePath}/${path.basename(url)}`;
            } else {
              const csMatch = absoluteDirPath.match(IS_CS_PATH);
              if (csMatch) {
                // CS path
                const relativePath = csMatch[1];
                remoteUrl = `${RAW_GITHUB_BASE}/${GITHUB_REPO_OWNER}/courses/${COMMIT_REF}/${relativePath}/${path.basename(url)}`;
              } else {
                const relativePath = path.relative(baseDir, absoluteDirPath);
                remoteUrl = `${RAW_GITHUB_BASE}/${GITHUB_REPO_OWNER}/do-it/${COMMIT_REF}/${relativePath}/${path.basename(url)}`;
              }
            }

          }
          return remoteUrl;
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
