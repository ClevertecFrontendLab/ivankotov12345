import { extendTheme } from '@chakra-ui/react';

import { buttonTheme } from './components/button';
import { headingTheme } from './components/heading';

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
    },
    borders: {
        blackAlpha: '1px solid var(--chakra-colors-blackAlpha-200)',
    },
    styles: {
        global: {
            body: {
                color: 'black',
            },
        },
    },
    components: {
        Heading: headingTheme,
        Button: buttonTheme,
    },
});
