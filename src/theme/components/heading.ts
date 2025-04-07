import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const cardHeading = defineStyle({
    fontSize: 'xl',
    lineHeight: 'short',
    noOfLines: 1,
});

const sectionHeading = defineStyle({
    fontSize: '5xl',
    fontWeight: 'medium',
    lineHeight: 'none',
});

export const headingTheme = defineStyleConfig({
    variants: {
        card: cardHeading,
        section: sectionHeading,
    },
});
