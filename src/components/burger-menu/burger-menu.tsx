import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';

import { BurgerIcon } from '../icons';
import { Navigation } from '../navigation';

type BurgerMenuType = {
    isOpen: boolean;
    toggle: () => void;
    off: () => void;
};

export const BurgerMenu: React.FC<BurgerMenuType> = ({ isOpen, toggle, off }) => (
    <Menu isOpen={isOpen}>
        <MenuButton
            as={IconButton}
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

        <MenuList bg='shadowed' backdropFilter='blur(2px)' p={0} w='100vw' h='100vh'>
            <Navigation off={off} />
        </MenuList>
    </Menu>
);
