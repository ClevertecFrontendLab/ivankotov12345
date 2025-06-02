import { Center } from '@chakra-ui/react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';

import { ImageIcon } from '../icons';

export const FallbackImage: React.FC = () => (
    <Center bg={COLORS_BLACK_ALPHA[200]} w={SIZES.full} h={SIZES.full} borderRadius='lg'>
        <ImageIcon w={8} h={7} />
    </Center>
);
