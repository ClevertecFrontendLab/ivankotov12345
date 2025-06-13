import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { Control, FieldPath, useController } from 'react-hook-form';

import { FilterTag } from '~/components/filter-tag';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SELECT_SIZES, SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { RecipeSchema } from '~/constants/validation-schemas/recipe';
import { useAppSelector } from '~/store/hooks';
import { selectSubCategories } from '~/store/slices/category-slice';

type SelectCategoryProps = {
    control: Control<RecipeSchema>;
};

const CATEGORY_FIELD_NAME: FieldPath<RecipeSchema> = 'categoriesIds';
const MAX_VISIBLE_TAGS = 2;

export const SelectCategory: React.FC<SelectCategoryProps> = ({ control }) => {
    const subCategories = useAppSelector(selectSubCategories);
    const { isOpen, onToggle } = useDisclosure();

    const {
        field,
        fieldState: { error },
    } = useController({ control, name: CATEGORY_FIELD_NAME });

    const onCheckboxClick = (value: string) => {
        const currentValue = Array.isArray(field.value) ? (field.value as string[]) : [];

        if (currentValue.includes(value)) {
            field.onChange(currentValue.filter((item) => item !== value));
        } else {
            field.onChange([...currentValue, value]);
        }
    };

    const selectedCategories = subCategories
        .filter((category) => field.value?.includes(category._id))
        .map((category) => category.title);

    const visibleTags = selectedCategories.slice(0, MAX_VISIBLE_TAGS);
    const restTagsCount = selectedCategories.length - MAX_VISIBLE_TAGS;

    return (
        <Menu closeOnSelect={false} matchWidth isOpen={isOpen}>
            <MenuButton
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                variant={STYLE_VARIANTS.menuButton}
                maxW={SELECT_SIZES.maxW}
                height={SIZES.auto}
                borderColor={error ? COLORS.red : COLORS_BLACK_ALPHA[200]}
                onClick={onToggle}
                data-test-id={DATA_TEST_ID.recipeCategories}
            >
                {selectedCategories.length > 0 ? (
                    <Flex w={SIZES.full} flexWrap='wrap'>
                        <Box overflow='hidden'>
                            {visibleTags.map((tag) => (
                                <FilterTag key={tag} item={tag} />
                            ))}
                        </Box>

                        {selectedCategories.length > 2 && <FilterTag item={`+${restTagsCount}`} />}
                    </Flex>
                ) : (
                    <Text>{PLACEHOLDERS.selectFromList}</Text>
                )}
            </MenuButton>

            <MenuList maxH={SELECT_SIZES.maxOptionListHeight} overflowY='scroll'>
                {subCategories.map(({ _id, title }, index) => (
                    <Box
                        px={4}
                        py={1.5}
                        background={index % 2 ? COLORS.white : COLORS_BLACK_ALPHA[100]}
                        key={_id}
                    >
                        <Checkbox
                            variant={STYLE_VARIANTS.limeCheckbox}
                            value={_id}
                            isChecked={field.value?.includes(_id)}
                            onChange={() => onCheckboxClick(_id)}
                        >
                            {title}
                        </Checkbox>
                    </Box>
                ))}
            </MenuList>
        </Menu>
    );
};
