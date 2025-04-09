import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const buttonBlack = defineStyle({
    bg: 'black',
    color: 'white',
});

export const buttonTheme = defineStyleConfig({
    variants: {
        black: buttonBlack,
        ghost: {
            color: 'black',
        },
    },
});
