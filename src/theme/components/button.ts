import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const buttonBlack = defineStyle({
    bg: 'black',
    color: 'white',
    _disabled: {
        border: '1px solid',
        borderColor: 'blackAlpha.200',
        bg: 'blackAlpha.400',
        color: 'alpha.700',
    },
});

const buttonHighlighted = defineStyle({
    bg: 'black',
    color: 'white',
    _after: {
        content: '""',
        position: 'absolute',
        zIndex: 'hide',
        w: '208px',
        h: '208px',
        bg: 'radial-gradient(20% 20% at 50% 50%, rgba(196, 255, 97, 0.70) 0%, rgba(255, 255, 255, 0.00) 100%)',
    },
});

const menuButton = defineStyle({
    w: 'full',
    textAlign: 'start',
    iconSpacing: 3,
    border: '1px solid',
    borderColor: 'blackAlpha.200',
    borderRadius: 'md',
    color: 'blackAlpha.700',
    fontWeight: 'normal',
    px: 4,
    py: 2,
    _disabled: {
        opacity: 1,
    },
    _active: {
        background: 'white',
        borderColor: 'lime.300',
    },
    _hover: {
        background: 'white',
    },
});

const limeButton = defineStyle({
    color: 'lime.600',
    border: '1px solid',
    borderColor: 'lime.600',
    p: 2,
});

export const buttonTheme = defineStyleConfig({
    variants: {
        black: buttonBlack,
        highlighted: buttonHighlighted,
        menuButton: menuButton,
        limeButton: limeButton,
        none: {
            color: 'black',
        },
    },
});
