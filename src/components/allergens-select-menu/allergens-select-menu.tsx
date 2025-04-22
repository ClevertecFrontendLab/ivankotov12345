import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Switch,
    Text,
} from '@chakra-ui/react';

import { ALLERGENS_LIST } from '~/constants/allergens-list';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    addAllergen,
    removeAllergen,
    selectAllergens,
    toggleAllergenDisabled,
} from '~/store/slices/allergens-slice';

import { AllergenTag } from './allergen-tag';
import { CustomAllergenInput } from './custom-allergen-input';

export const AllergensSelectMenu: React.FC = () => {
    const { selectedAllergensList, isDisabled } = useAppSelector(selectAllergens);
    const dispatch = useAppDispatch();

    const toggleAllergen = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (selectedAllergensList.includes(value)) {
            dispatch(removeAllergen(value));
        } else {
            dispatch(addAllergen(value));
        }
    };
    return (
        <>
            <HStack gap={3}>
                <Text whiteSpace='nowrap' fontWeight='medium'>
                    Исключить мои аллергены
                </Text>
                <Switch
                    isChecked={!isDisabled}
                    onChange={() => dispatch(toggleAllergenDisabled())}
                />
            </HStack>

            <Menu matchWidth closeOnSelect={false} isOpen={isDisabled ? false : undefined}>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant='menuButton'
                    w='full'
                >
                    {selectedAllergensList.length
                        ? selectedAllergensList.map((allergen) => (
                              <AllergenTag key={allergen} allergen={allergen} />
                          ))
                        : 'Выберите из списка...'}
                </MenuButton>

                <MenuList boxShadow='selectBoxShadow' border='none'>
                    {ALLERGENS_LIST.map((allergen, index) => (
                        <MenuItem
                            key={allergen}
                            gap={2}
                            background={index % 2 ? 'white' : 'blackAlpha.100'}
                            px={4}
                            py={1.5}
                        >
                            <Checkbox
                                variant='limeCheckbox'
                                value={allergen}
                                onChange={toggleAllergen}
                            >
                                {allergen}
                            </Checkbox>
                        </MenuItem>
                    ))}

                    <CustomAllergenInput />
                </MenuList>
            </Menu>
        </>
    );
};
