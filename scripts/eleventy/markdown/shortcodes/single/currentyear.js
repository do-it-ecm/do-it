
export default function (eleventyConfig) {

    eleventyConfig.addShortcode("currentyear", () => {
        return new Date().getFullYear();
    });
}
