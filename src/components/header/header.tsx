import { Flex, IconButton, Image, Spacer, Stack, useMediaQuery } from '@chakra-ui/react';

import avatar from '~/assets/img/avatar.jpg';

import { Breadcrumbs } from '../breadcrumbs';
import { BurgerIcon } from '../icons/burger';
import { Stats } from '../stats';
import { User } from '../user';
import pan from './assets/svg/pan.svg';
import yeeDaa from './assets/svg/yee-daa.svg';

export const Header: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');

    return (
        <Flex
            maxW='1920px'
            w='full'
            h='full'
            alignItems='center'
            py={{ base: 1, lg: 4 }}
            pl={{ base: 5, lg: 4 }}
            pr={{ base: 5, lg: 24 }}
            gap={{ base: 0, lg: 32 }}
        >
            <Stack direction='row' alignItems='flex-end'>
                <Image src={pan} alt='pan' />
                <Image src={yeeDaa} alt='yee daa' display={{ base: 'none', md: 'block' }} />
            </Stack>

            {!isTablet && <Breadcrumbs />}

            <Spacer />

            {!isTablet && (
                <User avatar={avatar} name='Екатерина Константинопольская' email='@bake_and_pie' />
            )}

            {isTablet && (
                <>
                    <Stats size='xs' />
                    <IconButton
                        icon={<BurgerIcon />}
                        variant='ghost'
                        aria-label='burger-button'
                        size='lg'
                    />
                </>
            )}
        </Flex>
    );
};
