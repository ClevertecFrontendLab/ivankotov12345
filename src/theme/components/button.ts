import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const buttonBlack = defineStyle({
    bg: 'black',
    color: 'white',
});

const buttonHighlighted = defineStyle({
    bg: 'black',
    color: 'white',
    _after: {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        w: '208px',
        h: '208px',
        bg: 'radial-gradient(20% 20% at 50% 50%, rgba(196, 255, 97, 0.70) 0%, rgba(255, 255, 255, 0.00) 100%)',
    },
});

export const buttonTheme = defineStyleConfig({
    variants: {
        black: buttonBlack,
        highlighted: buttonHighlighted,
        ghost: {
            color: 'black',
        },
    },
});
