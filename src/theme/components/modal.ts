import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const authModal = definePartsStyle({
    overlay: {
        bg: 'shadowed',
        backdropFilter: 'blur(2px)',
    },
    dialog: {
        maxW: '400px',
        alignItems: 'center',
        gap: 8,
        p: 8,
        borderRadius: '2xl',
        textAlign: 'center',
    },
});

export const modalTheme = defineMultiStyleConfig({
    variants: {
        authModal: authModal,
    },
});
