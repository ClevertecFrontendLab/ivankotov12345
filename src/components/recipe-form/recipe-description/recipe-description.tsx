import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { AppInput, AppNumberInput, AppTextarea } from '~/components/form-fields';
import { LoadImage } from '~/components/form-fields/load-image';
import { SelectCategory } from '~/components/form-fields/select-category';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { RECIPE_DESCRIPTION_SIZES, SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { RecipeFormProps } from '~/types/props';

export const RecipeDescription: React.FC<RecipeFormProps> = ({
    register,
    control,
    errors,
    setValue,
}) => (
    <Flex
        flexDir={{ base: 'column', md: 'row' }}
        gap={6}
        pr={{ base: 0, '2xl': 28 }}
        h={{ base: SIZES.auto, md: RECIPE_DESCRIPTION_SIZES.height }}
    >
        <Box w={SIZES.full} height={{ base: 56, lg: SIZES.full }}>
            <LoadImage
                control={control}
                name='image'
                isInvalid={!!errors.image}
                testIdImageBlock={DATA_TEST_ID.recipeImageBlock}
                testIdInput={DATA_TEST_ID.recipeImageBlockInputFile}
                testIdImage={DATA_TEST_ID.recipeImageBlockPreviewImage}
            />
        </Box>

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
                    testId={DATA_TEST_ID.recipeTitle}
                />

                <AppTextarea
                    register={register('description')}
                    placeholder={PLACEHOLDERS.recipeDescription}
                    isInvalid={!!errors.description}
                    setValue={setValue}
                    testId={DATA_TEST_ID.recipeDescription}
                />

                <HStack justifyContent='space-between' w={SIZES.full}>
                    <Text variant={STYLE_VARIANTS.inputLabel}>На сколько человек ваш рецепт?</Text>
                    <AppNumberInput
                        control={control}
                        name='portions'
                        isInvalid={!!errors.portions}
                        withStepper={true}
                        testId={DATA_TEST_ID.recipePortions}
                    />
                </HStack>

                <HStack justifyContent='space-between' w={SIZES.full}>
                    <Text variant={STYLE_VARIANTS.inputLabel}>
                        Сколько времени готовить в минутах?
                    </Text>
                    <AppNumberInput
                        control={control}
                        name='time'
                        isInvalid={!!errors.time}
                        withStepper={true}
                        testId={DATA_TEST_ID.recipeTime}
                    />
                </HStack>
            </VStack>
        </Box>
    </Flex>
);
