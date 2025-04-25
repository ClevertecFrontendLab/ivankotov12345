import { CloseIcon } from '@chakra-ui/icons';
import { Box, Drawer, DrawerOverlay, IconButton } from '@chakra-ui/react';

import { BurgerIcon } from '../icons';
import { Navigation } from '../navigation';

type BurgerMenuType = {
    isOpen: boolean;
    toggle: () => void;
    off: () => void;
};

export const BurgerMenu: React.FC<BurgerMenuType> = ({ isOpen, toggle, off }) => (
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
            onClick={toggle}
            size='sm'
        />

        <Drawer isOpen={isOpen} onClose={off}>
            <DrawerOverlay bg='shadowed' backdropFilter='blur(2px)' zIndex='base' />
            <Navigation off={off} />
        </Drawer>
    </Box>
);
