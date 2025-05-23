import { CloseIcon } from '@chakra-ui/icons';
import { Box, Drawer, DrawerContent, DrawerOverlay, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';

import { BurgerIcon } from '~/components/icons';
import { Navigation } from '~/components/navigation';
import { BACKDROP_FILTER } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { Z_INDEX } from '~/constants/styles/z-index';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu, selectBurger, toggleBurgerMenu } from '~/store/slices/burger-slice';

export const BurgerMenu: React.FC = () => {
    const { isOpen } = useAppSelector(selectBurger);
    const dispatch = useAppDispatch();
    const toggleBurger = () => dispatch(toggleBurgerMenu());
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    return (
        <Box>
            <IconButton
                icon={
                    isOpen ? (
                        <CloseIcon data-test-id={DATA_TEST_ID.closeIcon} />
                    ) : (
                        <BurgerIcon data-test-id={DATA_TEST_ID.hamburgerIcon} />
                    )
                }
                variant={STYLE_VARIANTS.none}
                aria-label='burger'
                onClick={toggleBurger}
                size='sm'
                ref={buttonRef}
            />

            {isOpen ? (
                <Drawer isOpen={isOpen} onClose={() => dispatch(closeBurgerMenu())}>
                    <DrawerOverlay
                        bg='shadowed'
                        backdropFilter={BACKDROP_FILTER}
                        zIndex={Z_INDEX.backdrop}
                    />
                    <DrawerContent
                        containerProps={{
                            display: 'none',
                        }}
                    />
                    <Navigation buttonRef={buttonRef} />
                </Drawer>
            ) : null}
        </Box>
    );
};
