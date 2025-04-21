import { Accordion, Button, Text, useMediaQuery, useOutsideClick, VStack } from '@chakra-ui/react';
import { useRef } from 'react';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';

import { Breadcrumbs } from '../breadcrumbs';
import { CategoryItem } from './category-item';
import { ExitIcon } from './exit-icon';

type NavigationProps = {
    off?: () => void;
};

export const Navigation: React.FC<NavigationProps> = ({ off }) => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const navRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick({
        ref: navRef as unknown as React.RefObject<HTMLElement>,
        handler: off,
    });

    return (
        <VStack
            position={{ base: 'absolute', lg: 'initial' }}
            maxW='burgerMenuMaxWidth'
            justifyContent={{ base: 'start', lg: 'space-between' }}
            alignItems='start'
            h={{ base: 'calc(100% - 140px)', lg: 'full' }}
            gap={{ base: 6, lg: 8 }}
            bg={{ base: 'white', lg: 'transparent' }}
            right={2}
            ref={navRef}
            borderBottomRadius={{ base: 'xl', lg: 'none' }}
        >
            {isTablet && <Breadcrumbs off={off} />}

            <Accordion overflowY='auto' w={{ base: 'full', lg: 'auto' }}>
                {NAV_MENU_ITEMS.map((props) => (
                    <CategoryItem {...props} key={props.category} />
                ))}
            </Accordion>

            <VStack
                w='full'
                pb={8}
                px={6}
                gap={5}
                alignItems='start'
                fontSize='xs'
                lineHeight='short'
            >
                <Text color='blackAlpha.400' fontWeight='medium'>
                    Версия программы 3.25
                </Text>
                <Text color='blackAlpha.700'>
                    Все права защищены, ученический файл, <br /> ©Клевер Технолоджи, 2025
                </Text>
                <Button leftIcon={<ExitIcon />} variant='none' p={0} size='2xs'>
                    Выйти
                </Button>
            </VStack>
        </VStack>
    );
};
