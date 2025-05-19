import { Accordion, Button, Text, useMediaQuery, useOutsideClick, VStack } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { Z_INDEX } from '~/constants/styles/z-index';
import { DATA_TEST_ID } from '~/constants/test-id';
import { usePathItems } from '~/hooks/use-path-items';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu } from '~/store/slices/burger-slice';
import { selectCategories } from '~/store/slices/category-slice';

import { Breadcrumbs } from '../breadcrumbs';
import { CategoryItem } from './category-item';
import { ExitIcon } from './exit-icon';

type NavigationProps = {
    buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

export const Navigation: React.FC<NavigationProps> = ({ buttonRef }) => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);

    const navRef = useRef<HTMLDivElement | null>(null);

    const { secondItemPath } = usePathItems();

    const activeIndex = useMemo(
        () => categories.findIndex(({ category }) => category === secondItemPath),
        [categories, secondItemPath],
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
            borderBottomRadius={{ base: 'xl', lg: 'none' }}
            bg={{ base: 'white', lg: 'transparent' }}
            top={16}
            right={2}
            ref={navRef}
            data-test-id={DATA_TEST_ID.nav}
            zIndex={Z_INDEX.burger}
        >
            {isTablet && <Breadcrumbs />}

            <Accordion
                overflowY='auto'
                w={{ base: SIZES.full, lg: SIZES.auto }}
                defaultIndex={activeIndex}
            >
                {categories &&
                    categories.map((props) => <CategoryItem {...props} key={props.category} />)}
            </Accordion>

            <VStack
                w={SIZES.full}
                pb={8}
                px={6}
                gap={5}
                alignItems='start'
                fontSize='xs'
                lineHeight='short'
            >
                <Text color={COLORS_BLACK_ALPHA[400]} fontWeight='medium'>
                    Версия программы 3.25
                </Text>
                <Text color={COLORS_BLACK_ALPHA[700]}>
                    Все права защищены, ученический файл, <br /> ©Клевер Технолоджи, 2025
                </Text>
                <Button leftIcon={<ExitIcon />} variant={STYLE_VARIANTS.none} p={0} size='2xs'>
                    Выйти
                </Button>
            </VStack>
        </VStack>
    );
};
