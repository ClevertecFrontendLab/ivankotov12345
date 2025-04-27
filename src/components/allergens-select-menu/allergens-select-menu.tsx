import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Menu, MenuButton, MenuList, Switch, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { ALLERGENS_LIST } from '~/constants/drawer-filter-items';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { clearFilters, selectAllergensFilter } from '~/store/slices/filters-slice';

import { AllergenCheckbox } from './allergen-checkbox';
import { AllergenTag } from './allergen-tag';
import { CustomAllergenInput } from './custom-allergen-input';

type AllergensSelectMenuProps = {
    isDrawerType?: boolean;
};

export const AllergensSelectMenu: React.FC<AllergensSelectMenuProps> = ({ isDrawerType }) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusCustomAllergen = () => inputRef.current?.focus();

    const toggleMenu = () => setIsOpen(!isOpen);

    const selectedAllergens = useAppSelector(selectAllergensFilter);
    const dispatch = useAppDispatch();

    const toggleAllergenSwitch = () => {
        setIsDisabled(!isDisabled);
        if (!isDisabled) {
            dispatch(clearFilters());
        }
    };
    return (
        <>
            <HStack gap={3}>
                <Text whiteSpace='nowrap' fontWeight='medium'>
                    Исключить мои аллергены
                </Text>
                <Switch
                    name='allergen switch'
                    isChecked={!isDisabled}
                    onChange={toggleAllergenSwitch}
                    data-test-id={isDrawerType ? 'allergens-switcher-filter' : 'allergens-switcher'}
                />
            </HStack>

            <Menu matchWidth closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant='menuButton'
                    height='auto'
                    data-test-id={
                        isDrawerType ? 'allergens-menu-button-filter' : 'allergens-menu-button'
                    }
                    isDisabled={isDisabled}
                    onClick={toggleMenu}
                >
                    <HStack alignItems='start' rowGap={1} columnGap={2} flexWrap='wrap'>
                        {selectedAllergens.length && !isDrawerType ? (
                            selectedAllergens.map((allergen) => (
                                <AllergenTag key={allergen} allergen={allergen} />
                            ))
                        ) : (
                            <Text>Выберите из списка...</Text>
                        )}
                    </HStack>
                </MenuButton>
                {isOpen ? (
                    <MenuList
                        boxShadow='selectBoxShadow'
                        border='none'
                        data-test-id='allergens-menu'
                    >
                        {ALLERGENS_LIST.map(({ item, label }, index) => (
                            <Box
                                key={item}
                                gap={2}
                                background={index % 2 ? 'white' : 'blackAlpha.100'}
                                px={4}
                                py={1.5}
                            >
                                <AllergenCheckbox
                                    item={item}
                                    label={label}
                                    index={index}
                                    focusCustomAllergern={focusCustomAllergen}
                                />
                            </Box>
                        ))}

                        <CustomAllergenInput inputRef={inputRef} />
                    </MenuList>
                ) : null}
            </Menu>
        </>
    );
};
