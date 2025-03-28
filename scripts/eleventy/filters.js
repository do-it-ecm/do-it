/**
 * Eleventy configuration for filters (build time)
 */

import { DateTime } from "luxon";

const YEAR_REGEX = /^(\d{4}-\d{4})$/;

export default function (eleventyConfig) {

    eleventyConfig.addFilter("parentUrl", function (url) {
        if (!url || typeof url !== "string") return url;

        // Remove any (multiple) trailing slash first
        let singleTrailing = url.replace(/\/+$/, "/");
        // Then cut back to the previous slash
        let idx = singleTrailing.lastIndexOf("/", singleTrailing.length - 2);
        if (idx === -1) {
            // If no slash at all, just return root
            return "/";
        }
        let parent = singleTrailing.substring(0, idx + 1);
        return parent.replace(/\/+$/, "/");
    });

    eleventyConfig.addFilter("getYearFromUrl", (url) => {
        const consideredYear = url.split("/")[2];
        return YEAR_REGEX.test(consideredYear) ? consideredYear : undefined;
    });

    eleventyConfig.addFilter("HalfTimeFromUrl", (url) => {
        if (url.endsWith(`.1/`)) {
            return `.1`;
        } else if (url.endsWith(`.2/`)) {
            return `.2`;
        }
        return undefined
    });

    eleventyConfig.addFilter("dateFormat", (dateObj, format = "dd/MM/yyyy") => {
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });

};
