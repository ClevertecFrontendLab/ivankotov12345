import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys,
);

const limeTabs = definePartsStyle({
    tablist: {
        flexWrap: {
            base: 'nowrap',
            lg: 'wrap',
        },
        justifyContent: {
            base: 'start',
            lg: 'center',
        },
        alignItems: 'center',
        gap: 1,
        pb: 0,
        borderBottom: '1px solid',
        borderColor: 'blackAlpha.200',
        overflowX: 'scroll',
        '::-webkit-scrollbar': {
            display: 'none',
        },
    },
    tab: {
        py: {
            base: 0,
            lg: 2,
        },
        flexShrink: 0,
        color: 'lime.800',
        _selected: {
            color: 'lime.600',
            borderBottom: '1px solid',
            borderColor: 'lime.600',
        },
    },
});

export const tabsTheme = defineMultiStyleConfig({
    variants: {
        limeTabs,
    },
});
