import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const loader = definePartsStyle({
    overlay: {
        bg: 'shadowed',
        backdropFilter: 'blur(2px)',
    },
    dialog: {
        w: '206px',
        h: '206px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'transparent',
        boxShadow: 'none',
    },
});

export const modalTheme = defineMultiStyleConfig({
    variants: {
        loader: loader,
    },
});
