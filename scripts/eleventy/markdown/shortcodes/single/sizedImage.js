export default function (eleventyConfig) {

    eleventyConfig.addShortcode('sizedImage', (src, alt, type = 'img', center = "true") => {
        const classMap = {
            bigBanner: 'img-big-banner',
            banner: 'img-banner',
            smallBanner: 'img-small-banner',

            hugeIcon: 'img-huge-icon',
            biggerIcon: 'img-bigger-icon',
            bigIcon: 'img-big-icon',
            icon: 'img-icon',
            smallIcon: 'img-small-icon',
            tinyIcon: 'img-tiny-icon',
            veryTinyIcon: 'img-very-tiny-icon',

            bigImg: 'img-big-img',
            img: 'img-img',
            smallImg: 'img-small-img',
        };

        let requestClass = classMap[type] || 'img-img';
        requestClass = center === "false" ? requestClass : `${requestClass} mx-auto`;

        return `<img src="${src}" alt="${alt}" class="${requestClass}">`;
    });

}
