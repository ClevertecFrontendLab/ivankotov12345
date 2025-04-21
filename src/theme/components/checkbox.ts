import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    checkboxAnatomy.keys,
);

const limeCheckbox = definePartsStyle({
    label: {
        color: 'gray.800',
    },
    control: {
        border: '2px solid',
        borderColor: 'lime.150',
        borderRadius: 'sm',
        _checked: {
            background: 'lime.400',
            borderColor: 'lime.400',
        },
    },
    icon: {
        color: 'black',
    },
});

export const checkboxTheme = defineMultiStyleConfig({
    variants: {
        limeCheckbox: limeCheckbox,
    },
});
