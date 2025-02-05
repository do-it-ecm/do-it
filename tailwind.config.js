/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

export default {
    mode: 'jit',
    content: [
        "./dist/**/*.{html,css,js}",
    ],
    plugins: [
        typography,
    ],
}
