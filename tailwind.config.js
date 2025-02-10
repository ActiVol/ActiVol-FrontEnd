/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind');

export default {
  content: [
    './index.html',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
      },
    },
  },
  plugins: [
    // Iconify plugin
    addDynamicIconSelectors(),
    // require('@tailwindcss/forms'),
  ],
};
