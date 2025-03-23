import { template } from "./utils.js";

export default function (eleventyConfig) {

  eleventyConfig.addPairedShortcode('attention', (content, arg = '<b>Attention</b>') => {

    return `
<div class="quote relative py-2 drop-shadow rounded rounded-tl-none rounded-bl-none border-solid border-l-8 border-red-500 bg-red-100 dark:border-red-800 dark:bg-red-950">
<svg class="absolute w-7 h-7 pl-1 pt-0.5 pb-0.5 fill-none stroke-red-500 dark:stroke-red-800 stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
</svg>
${template(content, arg)}
</div>
`;
  });
}
