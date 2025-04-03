import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        lime: {
            50: '#FFFFD3',
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
