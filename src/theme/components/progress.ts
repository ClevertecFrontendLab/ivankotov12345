import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const progressLime = defineStyle({
    filledTrack: {
        bgColor: 'lime.300',
        bgImage:
            'linear-gradient(45deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.3) 75%, transparent 75%, transparent)',
    },
});

export const progressTheme = defineStyleConfig({
    variants: {
        progressLime: progressLime,
    },
});
