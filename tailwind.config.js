/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

export default {
    mode: 'jit',
    content: [
        "./dist/**/*.{html,css,js}",
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
