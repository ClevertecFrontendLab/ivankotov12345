import { extendTheme } from '@chakra-ui/react';

import { AccordionTheme } from './components/accordion';
import { absolute } from './components/box';
import { buttonTheme } from './components/button';
import { cardTheme } from './components/card';
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
    breakpoints: {
        sm: '30em',
        md: '40em',
        lg: '74rem',
        xl: '90rem',
        '2xl': '112rem',
    },
    sizes: {
        pageHeaderMaxWidth: '900px',
        carouselItem: {
            sm: '158px',
            md: '277px',
            lg: '322px',
            xl: '346px',
        },
        imageHeight: {
            md: '128px',
            lg: '230px',
        },
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
            body: {
                color: 'black',
            },
            '.swiper-slide': {
                height: 'auto',
            },
        },
    },
    layerStyles: {
        absolute,
    },
    components: {
        Heading: headingTheme,
        Button: buttonTheme,
        IconButton: buttonTheme,
        Accordion: AccordionTheme,
        Link: linkTheme,
        Card: cardTheme,
    },
});
