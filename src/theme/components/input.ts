import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const searchInput = definePartsStyle({
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

const authInput = definePartsStyle({
    field: {
        color: 'lime.800',
        caretColor: 'lime.800',
        bg: 'white',
        border: '1px solid',
        borderColor: 'lime.150',
        borderRadius: 'md',

        _placeholder: {
            color: 'lime.800',
        },
        _hover: {
            borderColor: 'lime.150',
        },
        _invalid: {
            border: '2px solid',
            borderColor: 'red.500',
        },
    },
});

export const inputTheme = defineMultiStyleConfig({
    variants: {
        searchInput: searchInput,
        authInput: authInput,
    },
});
