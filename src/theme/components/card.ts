import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    cardAnatomy.keys,
);

const baseStyle = definePartsStyle({
    container: {
        _hover: {
            boxShadow:
                '0px 4px 6px -1px rgba(32, 126, 0, 0.10), 0px 2px 4px -1px rgba(32, 126, 0, 0.06)',
        },
    },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle });
