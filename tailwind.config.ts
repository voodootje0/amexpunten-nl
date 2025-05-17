import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#111827',
            a: {
              color: '#e11d48',
              '&:hover': {
                color: '#be123c',
              },
            },
            h1: {
              color: '#111827',
              fontWeight: '800',
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
            },
            h4: {
              color: '#111827',
              fontWeight: '600',
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            blockquote: {
              color: '#374151',
              borderLeftColor: '#e11d48',
            },
            code: {
              color: '#111827',
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontWeight: 'normal',
            },
            img: {
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
            ul: {
              listStyleType: 'disc',
            },
            ol: {
              listStyleType: 'decimal',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 