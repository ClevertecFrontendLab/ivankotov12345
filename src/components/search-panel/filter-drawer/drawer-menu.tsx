import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch } from '~/store/hooks';
import { FilterItem } from '~/types/filter-item';

import { FilterTag } from '../filter-tag';

type DrawerProps = {
    placeholder: string;
    items: FilterItem[];
    selectedItems: string[];
    addItem: ActionCreatorWithPayload<string, string>;
    removeItem: ActionCreatorWithPayload<string, string>;
    tagList: FilterItem[];
    testId?: string;
};

export const DrawerMenu: React.FC<DrawerProps> = ({
    placeholder,
    items,
    addItem,
    removeItem,
    testId,
    tagList,
}) => {
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

    const tagListLabels = tagList.map(({ label }) => label);
    return (
        <Menu matchWidth closeOnSelect={false}>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant={STYLE_VARIANTS.menuButton}
                w={SIZES.full}
                height={SIZES.auto}
                data-test-id={testId}
            >
                <HStack alignItems='start' rowGap={1} columnGap={2} flexWrap='wrap'>
                    {tagListLabels.length ? (
                        tagListLabels.map((tag) => <FilterTag key={tag} item={tag} />)
                    ) : (
                        <Text>{placeholder}</Text>
                    )}
                </HStack>
            </MenuButton>

            <MenuList>
                {items.map(({ item, label }, index) => (
                    <MenuItem
                        key={item}
                        gap={2}
                        background={index % 2 ? COLORS.white : COLORS_BLACK_ALPHA[100]}
                        px={4}
                        py={1.5}
                    >
                        <Checkbox
                            variant={STYLE_VARIANTS.limeCheckbox}
                            value={item}
                            onChange={toggleItem}
                            data-test-id={`${DATA_TEST_ID.checkbox}-${label.toLowerCase()}`}
                        >
                            {label}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
