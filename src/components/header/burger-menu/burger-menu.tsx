import { CloseIcon } from '@chakra-ui/icons';
import { Box, Drawer, DrawerOverlay, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu, selectBurger, toggleBurgerMenu } from '~/store/slices/burger-slice';

import { BurgerIcon } from '../../icons';
import { Navigation } from '../../navigation';

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
                        <CloseIcon data-test-id='close-icon' />
                    ) : (
                        <BurgerIcon data-test-id='hamburger-icon' />
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
                    <DrawerOverlay bg='shadowed' backdropFilter='blur(2px)' zIndex='base' />
                    <Navigation buttonRef={buttonRef} />
                </Drawer>
            ) : null}
        </Box>
    );
};
