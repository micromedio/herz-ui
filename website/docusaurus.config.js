const lightCodeTheme = require('prism-react-renderer/themes/github');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'Herz UI',
    tagline:
      'Herz UI (/hɛrʦ/ - Hérts) is a design system containing a styleguide(colors, grid, icons, typography) and library of UI components',
    url: 'https://herz-ui.micromed.io',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'micromed', // Usually your GitHub org/user name.
    projectName: 'herz-ui', // Usually your repo name.

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],
    themes: ['@docusaurus/theme-live-codeblock'],
    plugins: [
      [
        'docusaurus-plugin-react-docgen-typescript',
        {
          // pass in a single string or an array of strings
          src: [
            '../src/components/**/*.tsx',
            '!../src/components/**/*.test.tsx',
            '!../src/components/**/*.stories.tsx',
          ],
          global: false,
          parserOptions: {
            // pass parserOptions to react-docgen-typescript
            // here is a good starting point which filters out all
            // types from react
            propFilter: (property) => {
              if (property.parent) {
                return (
                  !property.parent.fileName.includes('@types/react') &&
                  !['css'].includes(property.name)
                );
              }

              return !property.name.includes('css');
            },
          },
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'Herz UI',
          logo: {
            alt: 'Micromed Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'intro',
              position: 'left',
              label: 'Documentation',
            },
            {
              href: 'https://github.com/micromedio/herz-ui',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          copyright: `Copyright © ${new Date().getFullYear()} Micromed. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: {
            plain: {
              color: '#F8F8F2',
              backgroundColor: '#2A2A2A',
            },
            styles: [
              {
                types: ['prolog', 'constant', 'builtin'],
                style: {
                  color: '#66B4FD',
                },
              },
              {
                types: ['inserted', 'function'],
                style: {
                  color: '#30D158',
                },
              },
              {
                types: ['deleted'],
                style: {
                  color: '#E53636',
                },
              },
              {
                types: ['changed'],
                style: {
                  color: '#FFF17D',
                },
              },
              {
                types: ['punctuation', 'symbol'],
                style: {
                  color: 'rgb(248, 248, 242)',
                },
              },
              {
                types: ['string', 'char', 'tag', 'selector'],
                style: {
                  color: '#FF3C3C',
                },
              },
              {
                types: ['keyword', 'variable'],
                style: {
                  color: '#66B4FD',
                  fontStyle: 'italic',
                },
              },
              {
                types: ['comment'],
                style: {
                  color: '#777',
                },
              },
              {
                types: ['attr-name'],
                style: {
                  color: '#FEFF99',
                },
              },
            ],
          },
        },
      }),
  }
);
