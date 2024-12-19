import { DateTime } from "luxon";

export default function(eleventyConfig) {
    // Filter to get the parent path from `filePathStem`
    eleventyConfig.addFilter("siteUrl", function (url, base = "/") {
        const baseUrl = process.env.BASE_URL || "http://localhost/";
        try {
            const processUrl = (u) => {
                const fullUrl = new URL(u, new URL(base, baseUrl).href);
                return decodeURI(fullUrl.pathname);
            };
            return Array.isArray(url) ? url.map(processUrl) : processUrl(url);
        } catch (err) {
            console.error(`Error in siteUrl filter for url: "${url}", base: "${base}"`, err);
            return url;
        }
    });

    // Filter to extract a value from a path based on a separator and index
    eleventyConfig.addFilter("getValueFromPath", function(str, separator, value) {
        if (!str || typeof str !== "string") return undefined;
        const parts = str.split(new RegExp(separator));
        return parts[value] || undefined;
    });

    // Filter to detect ".1" or ".2" from URLs for half-time logic
    eleventyConfig.addFilter("HalfTimeFromUrl", (url) => {
        if (!url || typeof url !== "string") return undefined;
        if (url.endsWith(".1/")) {
            return ".1";
        } else if (url.endsWith(".2/")) {
            return ".2";
        }
        return undefined;
    });

    // Filter to format dates using Luxon
    eleventyConfig.addFilter("dateFormat", (dateObj, format = "dd/MM/yyyy") => {
        if (!dateObj || isNaN(new Date(dateObj))) {
            console.warn(`Invalid date passed to dateFormat filter: ${dateObj}`);
            return "Invalid date";
        }
        return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
    });
}
