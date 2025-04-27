import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const navigationLink = defineStyle({
    display: 'flex',
    alignItems: 'center',
    w: 'full',
    py: 1.5,
    pr: 2,
    pl: 10,
    gap: 3,
    fontWeight: 'medium',
    _before: {
        content: '""',
        w: 0.5,
        h: 6,
        bg: 'lime.300',
    },
    _hover: {
        bg: 'lime.50',
        textDecoration: 'none',
        _before: {
            bg: 'lime.50',
        },
    },
    _activeLink: {
        fontWeight: 'bold',
        _before: {
            transform: 'scaleX(4)',
            transformOrigin: 'right',
        },
    },
});

export const linkTheme = defineStyleConfig({
    variants: {
        navigationLink: navigationLink,
    },
});
