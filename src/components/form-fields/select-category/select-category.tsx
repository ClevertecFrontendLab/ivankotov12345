import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { Control, FieldPath, useController } from 'react-hook-form';

import { PLACEHOLDERS } from '~/constants/placeholders';
import { COLORS, COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SELECT_SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { RecipeSchema } from '~/constants/validation-schemas/recipe';
import { useAppSelector } from '~/store/hooks';
import { selectSubCategories } from '~/store/slices/category-slice';

type SelectCategoryProps = {
    control: Control<RecipeSchema>;
};

const CATEGORY_FIELD_NAME: FieldPath<RecipeSchema> = 'categoriesIds';

export const SelectCategory: React.FC<SelectCategoryProps> = ({ control }) => {
    const subCategories = useAppSelector(selectSubCategories);

    const {
        field,
        fieldState: { error },
    } = useController({ control, name: CATEGORY_FIELD_NAME });

    const onCheckboxClick = (value: string) => {
        const currentValue = Array.isArray(field.value) ? field.value : [];

        if (currentValue.includes(value)) {
            field.onChange(currentValue.filter((item) => item !== value));
        } else {
            field.onChange([...currentValue, value]);
        }
    };

    return (
        <Menu closeOnSelect={false} matchWidth>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant={STYLE_VARIANTS.menuButton}
                maxW={SELECT_SIZES.maxW}
                borderColor={error ? COLORS.red : COLORS_BLACK_ALPHA[200]}
            >
                {PLACEHOLDERS.selectFromList}
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
