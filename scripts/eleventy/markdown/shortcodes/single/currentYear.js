
export default function (eleventyConfig) {

    eleventyConfig.addShortcode("currentYear", () => {
        return new Date().getFullYear();
    });
}
