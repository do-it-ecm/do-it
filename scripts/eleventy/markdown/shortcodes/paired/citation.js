export default function (eleventyConfig) {

  eleventyConfig.addPairedShortcode('citation', (content, author = '', source = '') => {

    const svgPath = `<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>`;
    const svgIconBegin = `<svg class="w-8 h-8 text-red-800 scale-x-[-1]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">${svgPath}</svg>`;
    const svgIconEnd = `<svg class="w-8 h-8 text-red-800 mb-4 ml-auto scale-y-[-1]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">${svgPath}</svg>`;

    const authorText = author ? `<div class="text-right text-gray-600 ml-auto">${author}</div>` : '';
    const sourceLink = source ? `<a href="${source.trim()}" class="ml-auto">${authorText}</a>` : authorText;
    return `
<div class="mx-8">
  <div class="text-xl italic text-gray-900 mx-auto w-fit">
    ${svgIconBegin}
    <div class="px-9 w-fit">${content}</div>
    ${svgIconEnd}
    ${sourceLink}
  </div>
</div>
`;
  });
}
