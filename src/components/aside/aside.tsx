import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/colors';
import { BG_GRADIENT_SIZE } from '~/constants/sizes';
import { Z_INDEX } from '~/constants/z-index';

import { Stats } from '../stats';

export const Aside: React.FC = () => (
    <Flex direction='column' h='full' position='relative'>
        <Stats size='md' />

        <Spacer />

        <VStack pb={14} pl={5}>
            <IconButton
                aria-label='edit button'
                icon={<EditIcon w={6} h={6} />}
                bg={COLORS.black}
                color={COLORS.white}
                borderRadius='full'
                size='lg'
                _after={{
                    content: '""',
                    position: 'absolute',
                    zIndex: Z_INDEX.hide,
                    w: BG_GRADIENT_SIZE,
                    h: BG_GRADIENT_SIZE,
                    bg: COLORS.bgRadialGradient,
                }}
            />
            <Text fontSize='xs' color={COLORS_BLACK_ALPHA[600]}>
                Записать рецепт
            </Text>
        </VStack>
    </Flex>
);
