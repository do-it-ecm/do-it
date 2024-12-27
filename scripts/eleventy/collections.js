/**
 * Eleventy configuration for collections (build time)
 */

export default function (eleventyConfig) {
    const TAGS_TO_OVERRIDE = ["PROMO", "HOME", "POK", "MON", "PROJET", "index"];

    for (const tag of TAGS_TO_OVERRIDE) {
        eleventyConfig.addCollection(tag, (collection) => {
            return collection
                .getFilteredByTag(tag)
                .filter((item) => {
                    const excluded = item.data.eleventyExcludeFromCollections;

                    // If `excluded` is `true`, skip this item from *all* collections.
                    if (excluded === true) {
                        return false;
                    }

                    // If `excluded` is an array containing our current tag, skip it.
                    if (Array.isArray(excluded) && excluded.includes(tag)) {
                        return false;
                    }

                    // Otherwise, keep it in this custom collection.
                    return true;
                });
        });
    }
}
