import { extendTheme } from '@chakra-ui/react';

import { AccordionTheme } from './components/accordion';
import { absolute } from './components/box';
import { buttonTheme } from './components/button';
import { cardTheme } from './components/card';
import { checkboxTheme } from './components/checkbox';
import { headingTheme } from './components/heading';
import { inputTheme } from './components/input';
import { linkTheme } from './components/link';
import { modalTheme } from './components/modal';
import { progressTheme } from './components/progress';
import { switchTheme } from './components/switch';
import { tabsTheme } from './components/tabs';
import { textTheme } from './components/text';

export const theme = extendTheme({
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            600: '#2DB100',
            700: '#207E00',
            800: '#134B00',
        },
        shadowed: 'var(--blackAlpha-300, rgba(0, 0, 0, 0.16))',
        bgRadialGraident:
            'radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 0.70) 0%, rgba(255, 255, 255, 0.00) 100%)',
        bgAuth: 'linear-gradient(237deg, #EAFFC7 30.27%, #29813F 136.1%)',
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
        burgerMenuMaxWidth: '344px',
        recipeDetailsMaxWidth: '670px',
        carouselItem: {
            sm: '158px',
            md: '277px',
            lg: '322px',
            xl: '346px',
            '2xl': '553px',
        },
        imageHeight: {
            md: '128px',
            lg: '230px',
            xl: '430px',
        },
        recipeImageWidth: {
            md: '30%',
            lg: '40%',
        },
        drawerWidth: {
            sm: '344px',
            lg: '400px',
        },
    },
    borders: {
        black: '1px solid',
        blackAlpha: '1px solid var(--chakra-colors-blackAlpha-200)',
        lime: '1px solid var(--chakra-colors-lime-400)',
    },
    shadows: {
        navBoxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20);',
        selectBoxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);',
        searchShadow:
            '0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);',
    },
    styles: {
        global: {
            '*:focus': {
                boxShadow: 'none !important',
            },
            body: {
                color: 'black',
            },
            '.swiper-slide': {
                height: 'auto',
            },
            '&::-webkit-scrollbar': {
                w: 2,
            },
            '&::-webkit-scrollbar-track': {
                background: 'blackAlpha.50',
                borderRadius: 'full',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'blackAlpha.300',
                borderRadius: 'full',
            },
        },
    },
    layerStyles: {
        absolute,
    },
    components: {
        Heading: headingTheme,
        Text: textTheme,
        Button: buttonTheme,
        IconButton: buttonTheme,
        Accordion: AccordionTheme,
        Link: linkTheme,
        Card: cardTheme,
        Checkbox: checkboxTheme,
        Switch: switchTheme,
        Input: inputTheme,
        Tabs: tabsTheme,
        Modal: modalTheme,
        Progress: progressTheme,
    },
});
