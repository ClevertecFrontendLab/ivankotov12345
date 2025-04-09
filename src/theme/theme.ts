import { extendTheme } from '@chakra-ui/react';

import { AccordionTheme } from './components/accordion';
import { buttonTheme } from './components/button';
import { headingTheme } from './components/heading';
import { linkTheme } from './components/link';

export const theme = extendTheme({
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            600: '#2DB100',
            800: '#134B00',
        },
    },
    fonts: {
        body: `Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`,
        heading: `Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`,
    },
    sizes: {
        pageHeaderMaxWidth: '900px',
    },
    borders: {
        blackAlpha: '1px solid var(--chakra-colors-blackAlpha-200)',
    },
    shadows: {
        navBoxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20);',
    },
    styles: {
        global: {
            '@font-face': {
                src: `url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap')`,
            },
            body: {
                color: 'black',
            },
        },
    },
    components: {
        Heading: headingTheme,
        Button: buttonTheme,
        Accordion: AccordionTheme,
        Link: linkTheme,
    },
});
