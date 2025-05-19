import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Menu, MenuButton, MenuList, Switch, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { ALLERGENS_LIST } from '~/constants/drawer-filter-items';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectAllergens, toggleAllergenDisabled } from '~/store/slices/allergens-slice';
import { clearAllergensFilters, selectAllergensFilter } from '~/store/slices/filters-slice';

import { FilterTag } from '../filter-tag';
import { AllergenCheckbox } from './allergen-checkbox';
import { CustomAllergenInput } from './custom-allergen-input';

export const AllergensSelectMenu: React.FC<{ isDrawerType?: boolean }> = ({ isDrawerType }) => {
    const { isDisabled } = useAppSelector(selectAllergens);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusCustomAllergen = () => inputRef.current?.focus();

    const toggleMenu = () => setIsOpen(!isOpen);

    const selectedAllergens = useAppSelector(selectAllergensFilter);
    const dispatch = useAppDispatch();

    const toggleAllergenSwitch = () => {
        dispatch(toggleAllergenDisabled());
        if (!isDisabled) {
            dispatch(clearAllergensFilters());
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
                    data-test-id={
                        isDrawerType
                            ? DATA_TEST_ID.allergenSwitcherFilter
                            : DATA_TEST_ID.allergenSwitcher
                    }
                />
            </HStack>

            <Menu matchWidth closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant='menuButton'
                    height='auto'
                    data-test-id={
                        isDrawerType
                            ? DATA_TEST_ID.allergensMenuButtonFilter
                            : DATA_TEST_ID.allergensMenuButton
                    }
                    isDisabled={isDisabled}
                    onClick={toggleMenu}
                    borderColor={
                        selectedAllergens.length ? COLORS_LIME[400] : COLORS_BLACK_ALPHA[200]
                    }
                >
                    <HStack alignItems='start' rowGap={1} columnGap={2} flexWrap='wrap'>
                        {selectedAllergens.length ? (
                            selectedAllergens.map((allergen) => (
                                <FilterTag key={allergen} item={allergen} />
                            ))
                        ) : (
                            <Text>Выберите из списка...</Text>
                        )}
                    </HStack>
                </MenuButton>

                <MenuList
                    boxShadow='selectBoxShadow'
                    border='none'
                    data-test-id={DATA_TEST_ID.allergensMenu}
                >
                    {ALLERGENS_LIST.map(({ item, label }, index) => (
                        <Box
                            key={item}
                            gap={2}
                            background={index % 2 ? 'white' : COLORS_BLACK_ALPHA[100]}
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

                    <CustomAllergenInput inputRef={inputRef} isOpen={isOpen} />
                </MenuList>
            </Menu>
        </>
    );
};
