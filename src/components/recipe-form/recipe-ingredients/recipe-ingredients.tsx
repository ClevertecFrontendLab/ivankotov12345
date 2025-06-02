import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, Select, Text, VStack } from '@chakra-ui/react';
import { Controller, useFieldArray } from 'react-hook-form';

import { AppInput, AppNumberInput } from '~/components/form-fields';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BORDERS } from '~/constants/styles/styles';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useGetMeasureUnitsQuery } from '~/query/services/create-recipe';
import { RecipeFormProps } from '~/types/props';

export const RecipeIngredients: React.FC<RecipeFormProps> = ({
    register,
    control,
    errors,
    setValue,
}) => {
    const { data: measureUnits } = useGetMeasureUnitsQuery();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const addIngredient = () => {
        append({
            measureUnit: '',
            title: '',
            count: 0,
        });
    };

    return (
        <VStack gap={4} mt={10}>
            <HStack alignSelf='start'>
                <Text variant={STYLE_VARIANTS.inputLabel}>
                    Добавьте ингредиенты рецепта, нажав на
                </Text>
                <AddIcon border={BORDERS.solid} borderRadius={SIZES.full} p={0.5} />
            </HStack>

            <Flex display={{ base: 'none', md: 'flex' }} gap={4} w={SIZES.full}>
                <Text variant={STYLE_VARIANTS.limeUppercase} flex='4 1 150px'>
                    Ингредиент
                </Text>
                <Text variant={STYLE_VARIANTS.limeUppercase} flex='0 1 80px'>
                    Количество
                </Text>
                <Text variant={STYLE_VARIANTS.limeUppercase} flex='2.5 1 150px'>
                    Единица измерения
                </Text>
            </Flex>

            {fields.map((field, index) => (
                <Flex
                    key={field.id}
                    w={SIZES.full}
                    gap={4}
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Box flexGrow={1}>
                        <AppInput
                            isInvalid={!!errors.ingredients?.[index]?.title}
                            register={register(`ingredients.${index}.title`)}
                            placeholder={PLACEHOLDERS.ingredient}
                            variant={STYLE_VARIANTS.formInput}
                            setValue={setValue}
                            testId={`${DATA_TEST_ID.recipeIngredientsTitle}${index}`}
                        />
                    </Box>

                    <Flex gap={4}>
                        <AppNumberInput
                            control={control}
                            name={`ingredients.${index}.count`}
                            isInvalid={!!errors.ingredients?.[index]?.count}
                            placeholder={PLACEHOLDERS.ingredientMeasure}
                            testId={`${DATA_TEST_ID.recipeIngredientsCount}${index}`}
                        />

                        <Box>
                            <Flex gap={4} alignItems='center'>
                                <Controller
                                    control={control}
                                    name={`ingredients.${index}.measureUnit`}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Select
                                            ref={ref}
                                            placeholder={PLACEHOLDERS.measureUnit}
                                            onChange={onChange}
                                            value={value || ''}
                                            isInvalid={!!errors.ingredients?.[index]?.measureUnit}
                                            data-test-id={`${DATA_TEST_ID.recipeIngredientsMeasureUnit}${index}`}
                                        >
                                            {measureUnits?.map(({ _id, name }) => (
                                                <option key={_id} value={name}>
                                                    {name}
                                                </option>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <IconButton
                                    size='sm'
                                    variant={
                                        index === fields.length - 1
                                            ? STYLE_VARIANTS.black
                                            : STYLE_VARIANTS.none
                                    }
                                    icon={
                                        index === fields.length - 1 ? (
                                            <AddIcon />
                                        ) : (
                                            <DeleteIcon color={COLORS_LIME[600]} />
                                        )
                                    }
                                    isRound={index === fields.length - 1}
                                    aria-label='ingredient control'
                                    onClick={
                                        index === fields.length - 1
                                            ? () => addIngredient()
                                            : () => remove(index)
                                    }
                                    data-test-id={
                                        index === fields.length - 1
                                            ? DATA_TEST_ID.recipeIngredientsAddIngredients
                                            : `${DATA_TEST_ID.recipeIngredientsRemoveIngredients}${index}`
                                    }
                                />
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            ))}
        </VStack>
    );
};
