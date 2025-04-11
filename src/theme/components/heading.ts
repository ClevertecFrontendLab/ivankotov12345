import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const cardHeading = defineStyle({
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: 'short',
    noOfLines: 1,
    '@media (max-width: 74rem)': {
        fontSize: 'md',
        noOfLines: 2,
    },
});

const sectionHeading = defineStyle({
    fontSize: '5xl',
    fontWeight: 'medium',
    lineHeight: 'none',
    '@media (max-width: 90rem)': {
        fontSize: '4xl',
    },
    '@media (max-width: 74rem)': {
        fontSize: '2xl',
    },
});

export const headingTheme = defineStyleConfig({
    variants: {
        card: cardHeading,
        section: sectionHeading,
    },
});
