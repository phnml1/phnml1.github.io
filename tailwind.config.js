/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['var(--opensans)'],
        kanit: ['var(--kanit)'],
      },
      backgroundColor: {
        'dark-primary': '#171717',
        'dark-secondary': '#262626'
      },
      colors: {
        'dark-primary': '#e5e5e5',
        'dark-secondary': '#a3a3a3'
      },
      borderColor: {
        'darkdetailnav': '#4d4d4d',
        'detailnav': '#dee2e6',
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.dark-secondary'),
            '--tw-prose-headings': theme('colors.dark-primary'),
            '--tw-prose-links': theme('colors.dark-primary'),
            '--tw-prose-bold': theme('colors.dark-primary'),
            '--tw-prose-counters': theme('colors.dark-primary'),
            '--tw-prose-bullets': theme('colors.dark-primary'),
            '--tw-prose-quotes': theme('colors.dark-primary'),
        
          },
        },
      }),
    },
  },
  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
  darkMode: 'class',
}

