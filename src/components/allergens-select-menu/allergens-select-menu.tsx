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

import { ALLERGENS_LIST } from '~/constants/drawer-filter-items';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectAllergens, toggleAllergenDisabled } from '~/store/slices/allergens-slice';
import {
    addAllergen,
    clearFilters,
    removeAllergen,
    selectAllergensFilter,
} from '~/store/slices/filters-slice';

import { AllergenTag } from './allergen-tag';
import { CustomAllergenInput } from './custom-allergen-input';

type AllergensSelectMenuProps = {
    isDrawerType?: boolean;
};

export const AllergensSelectMenu: React.FC<AllergensSelectMenuProps> = ({ isDrawerType }) => {
    const { isDisabled } = useAppSelector(selectAllergens);
    const selectedAllergens = useAppSelector(selectAllergensFilter);
    const dispatch = useAppDispatch();

    const toggleAllergen = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (selectedAllergens.includes(value)) {
            dispatch(removeAllergen(value));
        } else {
            dispatch(addAllergen(value));
        }
    };

    const toggleAllergenSwitch = () => {
        dispatch(toggleAllergenDisabled());
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
                <Switch isChecked={!isDisabled} onChange={toggleAllergenSwitch} />
            </HStack>

            <Menu matchWidth closeOnSelect={false} isOpen={isDisabled ? false : undefined}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='menuButton'>
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

                <MenuList boxShadow='selectBoxShadow' border='none'>
                    {ALLERGENS_LIST.map(({ item, label }, index) => (
                        <MenuItem
                            key={item}
                            gap={2}
                            background={index % 2 ? 'white' : 'blackAlpha.100'}
                            px={4}
                            py={1.5}
                        >
                            <Checkbox variant='limeCheckbox' value={item} onChange={toggleAllergen}>
                                {label}
                            </Checkbox>
                        </MenuItem>
                    ))}

                    <CustomAllergenInput />
                </MenuList>
            </Menu>
        </>
    );
};
