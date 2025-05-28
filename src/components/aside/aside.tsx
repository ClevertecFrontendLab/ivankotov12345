import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { BG_GRADIENT_SIZE, SIZES } from '~/constants/styles/sizes';
import { Z_INDEX } from '~/constants/styles/z-index';

import { Stats } from '../stats';

export const Aside: React.FC = () => (
    <Flex direction='column' h={SIZES.full} position='relative'>
        <Stats size='md' />

        <Spacer />

        <VStack pb={14} pl={5}>
            <IconButton
                as={NavLink}
                aria-label='edit button'
                icon={<EditIcon w={6} h={6} />}
                bg={COLORS.black}
                color={COLORS.white}
                borderRadius={SIZES.full}
                size='lg'
                _after={{
                    content: '""',
                    position: 'absolute',
                    zIndex: Z_INDEX.hide,
                    w: BG_GRADIENT_SIZE,
                    h: BG_GRADIENT_SIZE,
                    bg: COLORS.bgRadialGradient,
                }}
                to={ROUTER_PATHS.newRecipe}
                variant='none'
            />
            <Text fontSize='xs' color={COLORS_BLACK_ALPHA[600]}>
                Записать рецепт
            </Text>
        </VStack>
    </Flex>
);
