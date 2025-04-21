import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    switchAnatomy.keys,
);

const baseStyle = definePartsStyle({
    track: {
        bg: 'blackAlpha.300',
        _checked: {
            bg: 'lime.400',
        },
    },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
