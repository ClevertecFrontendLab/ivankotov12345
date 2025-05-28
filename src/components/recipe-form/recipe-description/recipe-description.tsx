import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { AppInput, AppNumberInput, AppTextarea } from '~/components/form-fields';
import { LoadImage } from '~/components/form-fields/load-image';
import { SelectCategory } from '~/components/form-fields/select-category';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { RECIPE_DESCRIPTION_SIZES, SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { RecipeFormProps } from '~/types/props';

export const RecipeDescription: React.FC<RecipeFormProps> = ({
    register,
    control,
    errors,
    setValue,
}) => (
    <Flex gap={6} pr={28} h={RECIPE_DESCRIPTION_SIZES.height}>
        <LoadImage control={control} name='image' isInvalid={!!errors.image} />

        <Box maxW={SIZES.recipeDetailsMaxWidth} w={SIZES.full}>
            <HStack justifyContent='space-between' mb={8}>
                <Text variant={STYLE_VARIANTS.inputLabel}>Выберите не менее 3-х тегов</Text>
                <SelectCategory control={control} />
            </HStack>

            <VStack gap={6}>
                <AppInput
                    register={register('title')}
                    placeholder={PLACEHOLDERS.recipeTitle}
                    variant={STYLE_VARIANTS.titleInput}
                    isInvalid={!!errors.title}
                    setValue={setValue}
                    testId=''
                />

                <AppTextarea
                    register={register('description')}
                    placeholder={PLACEHOLDERS.recipeDescription}
                    isInvalid={!!errors.description}
                    setValue={setValue}
                />

                <HStack justifyContent='space-between' w={SIZES.full}>
                    <Text variant={STYLE_VARIANTS.inputLabel}>На сколько человек ваш рецепт?</Text>
                    <AppNumberInput
                        register={register('portions', { valueAsNumber: true })}
                        isInvalid={!!errors.portions}
                        withStepper={true}
                    />
                </HStack>

                <HStack justifyContent='space-between' w={SIZES.full}>
                    <Text variant={STYLE_VARIANTS.inputLabel}>
                        Сколько времени готовить в минутах?
                    </Text>
                    <AppNumberInput
                        register={register('time', { valueAsNumber: true })}
                        isInvalid={!!errors.time}
                        withStepper={true}
                    />
                </HStack>
            </VStack>
        </Box>
    </Flex>
);
