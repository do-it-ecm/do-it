import { escapeHtml } from "./utils.js";

export default function (eleventyConfig) {

  eleventyConfig.addPairedShortcode('details', (content, arg = '<b>Détails</b>') => {

    return `
<div class="relative drop-shadow rounded rounded-tl-none rounded-bl-none border-solid border-l-8 border-indigo-500 bg-indigo-100 cursor-pointer select-none dark:border-indigo-800 dark:bg-indigo-950">
<details class="group">
<summary class="list-none py-0.5">
<svg class="group-open:hidden absolute w-7 h-7 pl-1 pt-0.5 fill-none stroke-2 stroke-indigo-500 dark:stroke-indigo-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
</svg>
<svg class="group-open:block hidden absolute w-7 h-7 pl-1 pt-0.5 fill-none stroke-2 stroke-indigo-500 dark:stroke-indigo-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
</svg>
<div class="pl-8 font-bold inline-block group-open:select-text">
${escapeHtml(arg)}
</div>
<svg class="group-open:hidden inline-block pl-3 w-10 fill-none stroke-2 stroke-indigo-500 dark:stroke-indigo-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
</svg>
</summary>
<div class="mx-8 pb-2 cursor-auto select-text">
${escapeHtml(content)}
</div>

</details>
</div>
`;
  });
}
