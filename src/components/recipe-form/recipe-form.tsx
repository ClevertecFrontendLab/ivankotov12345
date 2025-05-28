import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, HStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { RecipeSchema, recipeSchema } from '~/constants/validation-schemas/recipe';
import { useCreateRecipeMutation } from '~/query/services/create-recipe';

import { RecipeDescription } from './recipe-description';
import { RecipeIngredients } from './recipe-ingredients';
import { RecipeSteps } from './recipe-steps';

export const RecipeForm: React.FC = () => {
    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            ingredients: [{ measureUnit: null, title: null, count: null }],
            steps: [{ stepNumber: 1, description: null, image: null }],
        },
    });

    console.log(errors);

    const [createRecipe] = useCreateRecipeMutation();

    const onSubmit: SubmitHandler<RecipeSchema> = async (data) => {
        try {
            await createRecipe(data).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box as='form' mt={14} mb={9} onSubmit={handleSubmit(onSubmit)}>
            <RecipeDescription
                register={register}
                control={control}
                setValue={setValue}
                errors={errors}
            />

            <Box maxW={SIZES.recipeDetailsMaxWidth} mx={SIZES.auto}>
                <RecipeIngredients
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={errors}
                />

                <RecipeSteps
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={errors}
                />

                <HStack justifyContent='center' mt={10}>
                    <Button
                        size='lg'
                        variant={STYLE_VARIANTS.outline}
                        borderColor={COLORS_BLACK_ALPHA[600]}
                        leftIcon={<EditIcon />}
                    >
                        Сохранить черновик
                    </Button>
                    <Button size='lg' variant={STYLE_VARIANTS.black} type='submit'>
                        Опубликовать рецепт
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};
