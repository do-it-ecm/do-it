import { template } from "./utils.js";

export default function (eleventyConfig) {

  eleventyConfig.addPairedShortcode('exercice', (content, arg = '<b>Exercice</b>') => {

    return `
<div class="quote relative py-2 drop-shadow rounded rounded-tl-none rounded-bl-none border-solid border-l-8 border-orange-500 bg-orange-100 dark:border-orange-800 dark:bg-orange-950">
<svg class="absolute w-7 h-7 pl-1 pt-0.5 pb-0.5 fill-none stroke-2 stroke-orange-500 dark:stroke-orange-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
${template(content, arg)}
</div>
`;
  });
}
