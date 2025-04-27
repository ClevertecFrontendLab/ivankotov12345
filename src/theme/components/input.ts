import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const baseStyle = definePartsStyle({
    field: {
        color: 'lime.800',
        caretColor: 'lime.800',
        _placeholder: {
            color: 'lime.800',
        },
        _focus: {
            borderColor: 'blackAlpha.600',
        },
        _hover: {
            borderColor: 'blackAlpha.600',
        },
    },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
