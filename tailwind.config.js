/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

export default {
    mode: 'jit',
    content: [
        "./src/assets/stylesheets/*.{html,js,njk}",
        "./src/*.{html,js,njk}",
        "./src/_includes/**/*.{html,js,njk}",
        "./src/cs/**/*.{html,js,njk}",
        "./src/mon/**/*.{html,js,njk}",
        "./src/pok/**/*.{html,js,njk}",
        "./src/projets/**/*.{html,js,njk}",
        "./scripts/eleventy/markdown/shortcodes/paired/!(index).js",
        "./scripts/eleventy/markdown/shortcodes/single/!(index).js"
    ],
    theme: {
        extend: {
            colors: {
                'info': '#93c47d',
                'mgt': '#a9c6f4',
                'gp': '#f5cfcf',
            }
        },
    },
    plugins: [
        typography,
    ],
}
