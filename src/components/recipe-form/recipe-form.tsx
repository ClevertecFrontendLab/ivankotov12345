import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useBlocker, useParams } from 'react-router';

import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { RecipeSchema, recipeSchema } from '~/constants/validation-schemas/recipe';
import { useCreateRecipeMutation, useUpdateRecipeMutation } from '~/query/services/create-recipe';
import { useGetRecipeQuery } from '~/query/services/recipe';

import { setDefaultFormValues } from './helpers/set-default-form-values';
import { ModalBlockNavigation } from './modal-block-navigation';
import { RecipeDescription } from './recipe-description';
import { RecipeIngredients } from './recipe-ingredients';
import { RecipeSteps } from './recipe-steps';

export const RecipeForm: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        control,
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            ingredients: [{ measureUnit: null, title: null, count: null }],
            steps: [{ stepNumber: 1, description: null, image: null }],
        },
    });

    const { id } = useParams();
    const { data: recipeData } = useGetRecipeQuery(id as string, { skip: !id });

    const [createRecipe] = useCreateRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();

    const blocker = useBlocker(isDirty);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            onOpen();
        }
    }, [blocker, onOpen]);

    const onSubmit: SubmitHandler<RecipeSchema> = async (data) => {
        try {
            if (recipeData && id) {
                updateRecipe({ id: id, body: data }).unwrap();
            } else {
                await createRecipe(data).unwrap();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (recipeData) {
            setDefaultFormValues(recipeData, reset);
        }
    }, [recipeData, reset]);

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

            <ModalBlockNavigation isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};
