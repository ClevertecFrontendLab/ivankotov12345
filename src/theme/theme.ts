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
    },
});
