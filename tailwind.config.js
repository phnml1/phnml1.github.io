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
        headline: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        label: ['var(--font-space)', 'Space Grotesk', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundColor: {
        'dark-primary': '#171717',
        'dark-secondary': '#262626',
        'tag-hover': '#e5e5e5',
        'tag-dark-hover': '#363636',
        surface: '#131313',
        'surface-low': '#1C1B1B',
        'surface-container': '#201F1F',
        'surface-high': '#2A2A2A',
        'surface-highest': '#353534',
        'surface-lowest': '#0E0E0E',
      },
      colors: {
        'dark-primary': '#f8fafc',
        'dark-secondary': '#e5e7eb',
        void: '#131313',
        surface: '#131313',
        'surface-low': '#1C1B1B',
        'surface-container': '#201F1F',
        'surface-high': '#2A2A2A',
        'surface-highest': '#353534',
        'surface-lowest': '#0E0E0E',
        primary: '#ADC6FF',
        accent: '#3B82F6',
        'accent-strong': '#4D8EFF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#e5e7eb',
        outline: '#424754',
      },
      borderColor: {
        'darkdetailnav': '#4d4d4d',
        'detailnav': '#dee2e6',
      },
      dropShadow: {
        'tag-hover': '0px 0px 10px rgba(99, 102, 241, .5)'
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
    require('tailwind-scrollbar'),
    // ...
  ],
  darkMode: 'class',
}

