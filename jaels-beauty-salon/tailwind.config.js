const { fontFamily } = require('tailwindcss/defaultTheme');

/**
 * Tailwind CSS configuration for Jael's Beauty Salon.
 *
 * Defines our bespoke colour palette, typography and border radius tokens
 * which are used throughout the site.  See `app/globals.css` for the
 * definitions of CSS variables used by `next/font/google`.
 */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: '#EBD3D0',
        rose: '#D7ABA5',
        beige: '#F6EFEA',
        ink: '#4A4A4A',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', ...fontFamily.serif],
        body: ['var(--font-body)', ...fontFamily.sans],
        logoScript: ['var(--font-allura)', 'cursive'],
      },
    },
  },
  plugins: [],
};
