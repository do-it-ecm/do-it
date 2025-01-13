export default function (eleventyConfig) {

    eleventyConfig.addShortcode('title', function () {
        return '<span style="font-family: Consolas, sans-serif;">Do_<span style="color: #4a86e8">It</span></span>'
    });
}
