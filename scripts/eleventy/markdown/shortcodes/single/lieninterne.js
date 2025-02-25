import { DateTime } from "luxon";

export default function (eleventyConfig) {

    eleventyConfig.addShortcode('lieninterne', function (url, dateFormat = "dd/MM/yyyy") {

        let resolvedUrl = url.startsWith("/")
            ? url
            : url.startsWith("./")
                ? this.page.url + url.substring(2, this.page.url.lastIndexOf("/") + 1)
                : url;

        if (!resolvedUrl.endsWith("/")) {
            resolvedUrl += "/";
        }

        const article = this.ctx.collections.all.find(item => item.url.endsWith(resolvedUrl));

        const title = article?.data.title || "Titre indisponible";
        const résumé = article ?
            article.data.résumé || "Résumé non disponible"
            : `Résumé non disponible pour le contenu à l'adresse '${url}'`;
        const authors = article?.data.authors || "Auteur(s) inconnu(s)";
        const date = article ? DateTime.fromJSDate(article?.date).toFormat(dateFormat) : "Date non disponible";

        return `
            <div class="m-3 p-3 border-solid border-2 rounded relative flex flex-col">
                <div class="text-lg mb-3">
                    <a href="${resolvedUrl}">${title}</a>
                </div>
                <span class="line-clamp-3">${résumé}</span>
                <div class="flex flex-wrap flex-row grow justify-between items-end not-prose list-none mt-3 mb-1 mx-0 px-1 gap-1">
                    <div class="flex-1">
                        <span class="bg-blue-200 rounded-full p-2">${authors}</span>
                    </div>
                    <div>
                        <span class="bg-purple-200 rounded-full p-2">${date}</span>
                    </div>
                </div>
            </div>
        `
    });
};
