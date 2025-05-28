import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const searchInput = definePartsStyle({
    field: {
        border: '1px solid',
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
        height: '3rem',
        borderRadius: 'md',

        _placeholder: {
            color: 'lime.800',
        },
        _hover: {
            borderColor: 'lime.150',
        },
        _invalid: {
            border: '1px solid',
            borderColor: 'red.500',
        },
    },
});

const titleInput = definePartsStyle({
    field: {
        border: '1px solid',
        borderColor: 'lime.150',
        color: 'blackAlpha.900',
        height: '3rem',

        _focus: {
            borderColor: 'lime.150',
        },
        _placeholder: {
            color: 'blackAlpha.700',
        },
        _hover: {
            borderColor: 'lime.150',
        },
        _invalid: {
            borderColor: 'red.500',
        },
    },
});

const fromInput = definePartsStyle({
    field: {
        border: '1px solid',
        borderColor: 'blackAlpha.200',
        color: 'blackAlpha.900',
        height: '2.5rem',

        _placeholder: {
            color: 'blackAlpha.700',
        },
        _hover: {
            borderColor: 'lime.150',
        },
        _invalid: {
            borderColor: 'red.500',
        },
    },
});

export const inputTheme = defineMultiStyleConfig({
    variants: {
        searchInput: searchInput,
        authInput: authInput,
        titleInput: titleInput,
        fromInput: fromInput,
    },
});
