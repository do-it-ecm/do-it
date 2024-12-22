import { DateTime } from "luxon";

export default async function (eleventyConfig) {

    eleventyConfig.addCollection("promos", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/promos/!(20XX-20YY)/index.njk");
    });

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

    eleventyConfig.addFilter("HalfTimeFromUrl", (url) => {
        if (url.endsWith(`.1/`)) {
            return `.1`;
        } else if (url.endsWith(`.2/`)) {
            return `.2`;
        }
        else return undefined
    });

    eleventyConfig.addFilter("dateFormat", (dateObj, format = "dd/MM/yyyy") => {
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });

};
