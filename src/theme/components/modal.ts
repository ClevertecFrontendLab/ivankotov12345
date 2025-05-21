import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const authModal = definePartsStyle({
    overlay: {
        bg: 'shadowed',
        backdropFilter: 'blur(2px)',
    },
    dialog: {
        maxW: { base: '316px', lg: '400px' },
        alignItems: 'center',
        gap: 6,
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
