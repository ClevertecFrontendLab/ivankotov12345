import { defineStyleConfig } from '@chakra-ui/react';

export const AccordionTheme = defineStyleConfig({
    baseStyle: {
        root: {
            h: 'full',
            py: 2.5,
            pl: 2.5,
            pr: 4,
            boxShadow: {
                base: 'none',
                lg: ' 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
        button: {
            maxW: 80,
            gap: 3,
            py: 3,
            px: 2,
            borderRadius: 0,
            fontWeight: 'medium',
            _hover: {
                bg: 'lime.50',
                color: 'black',
            },
            _expanded: {
                bg: 'lime.100',
                fontWeight: 'bold',
            },
        },
        panel: {
            p: 0,
        },
    },
});
