import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '~/store/hooks';
import { FilterItem } from '~/types/filter-item';

type DrawerProps = {
    placeholder: string;
    items: FilterItem[];
    addItem: ActionCreatorWithPayload<string, string>;
    removeItem: ActionCreatorWithPayload<string, string>;
};

export const DrawerMenu: React.FC<DrawerProps> = ({ placeholder, items, addItem, removeItem }) => {
    const dispatch = useAppDispatch();

    const toggleItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            dispatch(addItem(value));
        } else {
            dispatch(removeItem(value));
        }
    };
    return (
        <Menu matchWidth closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='menuButton' w='full'>
                {placeholder}
            </MenuButton>
            <MenuList>
                {items.map(({ label, item }, index) => (
                    <MenuItem
                        key={label}
                        gap={2}
                        background={index % 2 ? 'white' : 'blackAlpha.100'}
                        px={4}
                        py={1.5}
                    >
                        <Checkbox variant='limeCheckbox' value={item} onChange={toggleItem}>
                            {label}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
