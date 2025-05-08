import { CloseIcon } from '@chakra-ui/icons';
import { Box, Drawer, DrawerContent, DrawerOverlay, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';

import { BurgerIcon } from '~/components/icons';
import { Navigation } from '~/components/navigation';
import { DATA_TEST_ID } from '~/constants/test-id';
import { Z_INDEX } from '~/constants/z-index';
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
                variant='none'
                aria-label='burger'
                onClick={toggleBurger}
                size='sm'
                ref={buttonRef}
            />

            {isOpen ? (
                <Drawer isOpen={isOpen} onClose={() => dispatch(closeBurgerMenu())}>
                    <DrawerOverlay
                        bg='shadowed'
                        backdropFilter='blur(2px)'
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
