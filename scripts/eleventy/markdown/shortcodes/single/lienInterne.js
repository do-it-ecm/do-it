import { DateTime } from "luxon";

export default function (eleventyConfig) {

    eleventyConfig.addShortcode('lienInterne', function (url, dateFormat = "dd/MM/yyyy") {

        const resolvedUrl = url.trim()
            // If the url starts with './' (or unique '.') we replace them with the base url to make an absolute one.
            .replace(/^\.\/|^\.$/, this.page.url)
            // Removes fragment from url so that a link can target a specific part of the internal article.
            .split('#')[0]
            // Adds a trailing backslash if it is missing because collection's urls all have one.
            .replace(/(?<!\/)$/, "/");

        const article = this.ctx.collections.all.find(item => item.url.endsWith(resolvedUrl));

        const title = article?.data.title || "Titre indisponible";
        const description = article ?
            article.data.description || "Description indisponible"
            : `Impossible de trouver l'article à l'adresse '${resolvedUrl}'`;
        const authors = article?.data?.authors || "Auteur(s) inconnu(s)";
        const date = article?.date ? DateTime.fromJSDate(article.date).toFormat(dateFormat) : "Date indisponible";

        return `
            <div class="m-3 p-3 border-solid border-2 rounded relative flex flex-col">
                <div class="text-lg mb-3">
                    <a href="${url}">${title}</a>
                </div>
                <span class="line-clamp-3">${description}</span>
                <div class="flex flex-wrap flex-row grow justify-between items-end not-prose list-none mt-3 mb-1 mx-0 px-1 gap-1">
                    <div class="flex-1">
                        <span class="bg-blue-200 rounded-full p-2 text-neutral-950">${authors}</span>
                    </div>
                    <div>
                        <span class="bg-purple-200 rounded-full p-2 text-neutral-950">${date}</span>
                    </div>
                </div>
            </div>
        `
    });
};
