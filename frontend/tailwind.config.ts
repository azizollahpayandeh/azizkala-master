import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1vw'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        'red' : '#DB4444',
        'secondary' : '#F5F5F5',
        'bg' : '#FFFFFF',
        'hoverbtn' : '#E07575',
        'hoverbtnblue' : "#A0BCE0",
        'text' : "#FAFAFA",
        'primary' : '#363738',
        'textgray' : '#7D8184'
      },
    },



  },
  plugins: [],
}
export default config
