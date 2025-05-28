import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const limeUppercase = defineStyle({
    fontSize: 'xs',
    fontWeight: 'bold',
    letterSpacing: '0.6px',
    color: 'lime.600',
});

const inputLabel = defineStyle({
    fontWeight: 'semibold',
    lineHeight: '24px',
});

export const textTheme = defineStyleConfig({
    variants: {
        limeUppercase: limeUppercase,
        inputLabel: inputLabel,
    },
});
