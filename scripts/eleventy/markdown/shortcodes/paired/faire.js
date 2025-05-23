import { template } from "./utils.js";

export default async function (eleventyConfig) {

  eleventyConfig.addPairedShortcode('faire', (content, arg = '<b>Faire</b>') => {

    return `
<div class="quote relative py-2 drop-shadow rounded rounded-tl-none rounded-bl-none border-solid border-l-8 border-yellow-500 bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-950">

<svg class="absolute w-7 h-7 pl-1 pt-0.5 pb-0.5 fill-none stroke-2 stroke-yellow-500 dark:stroke-yellow-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
${template(content, arg)}
</div>
`;
  });
}
