import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            600: '#2DB100',
            800: '#134B00',
        },
    },
    fonts: {
        body: `Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`,
    },
    styles: {
        global: {
            body: {
                color: 'black',
            },
        },
    },
});
