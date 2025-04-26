import { Accordion, Button, Text, useMediaQuery, useOutsideClick, VStack } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { useAppDispatch } from '~/store/hooks';
import { closeBurgerMenu } from '~/store/slices/burger-slice';

import { Breadcrumbs } from '../breadcrumbs';
import { CategoryItem } from './category-item';
import { ExitIcon } from './exit-icon';

type NavigationProps = {
    buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

export const Navigation: React.FC<NavigationProps> = ({ buttonRef }) => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const dispatch = useAppDispatch();

    const navRef = useRef<HTMLDivElement | null>(null);

    const { pathname } = useLocation();

    const [firstItemPath] = pathname.split('/').filter(Boolean);

    const activeIndex = useMemo(
        () => NAV_MENU_ITEMS.findIndex(({ path }) => path === firstItemPath),
        [firstItemPath],
    );

    useOutsideClick({
        ref: navRef as unknown as React.RefObject<HTMLElement>,
        handler: (event) => {
            if (buttonRef?.current && !buttonRef.current.contains(event.target as Node)) {
                dispatch(closeBurgerMenu());
            }
        },
    });

    return (
        <VStack
            position={{ base: 'fixed', lg: 'initial' }}
            maxW='burgerMenuMaxWidth'
            w={{ base: 'full', lg: 'auto' }}
            h={{ base: 'calc(100% - 140px)', lg: 'full' }}
            justifyContent={{ base: 'start', lg: 'space-between' }}
            alignItems='start'
            gap={{ base: 6, lg: 8 }}
            bg={{ base: 'white', lg: 'transparent' }}
            top={16}
            right={2}
            ref={navRef}
            borderBottomRadius={{ base: 'xl', lg: 'none' }}
            data-test-id='nav'
        >
            {isTablet && <Breadcrumbs />}

            <Accordion overflowY='auto' w={{ base: 'full', lg: 'auto' }} defaultIndex={activeIndex}>
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
