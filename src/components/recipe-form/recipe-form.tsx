import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useBlocker, useNavigate, useParams } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { RecipeSchema, recipeSchema } from '~/constants/validation-schemas/recipe';
import {
    useCreateDraftMutation,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} from '~/query/services/create-recipe';
import { useGetRecipeQuery } from '~/query/services/recipe';

import { DEFAULT_RECIPE_FORM_VALUES } from './constants';
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
        trigger,
        handleSubmit,
        getValues,
        formState: { errors, isDirty, touchedFields },
    } = useForm({
        resolver: zodResolver(recipeSchema),
        defaultValues: { ...DEFAULT_RECIPE_FORM_VALUES },
    });

    const navigate = useNavigate();

    const { id } = useParams();
    const { data: recipeData } = useGetRecipeQuery(id as string, { skip: !id });

    const [createRecipe, { isSuccess: isSuccesCreateRecipe }] = useCreateRecipeMutation();
    const [updateRecipe, { isSuccess: isSuccesUpdateRecipe }] = useUpdateRecipeMutation();
    const [createDraft, { isSuccess: isSuccesCreateDrafr }] = useCreateDraftMutation();

    const blocker = useBlocker(
        isDirty && !isSuccesCreateRecipe && !isSuccesUpdateRecipe && !isSuccesCreateDrafr,
    );

    const unblockNavigation = () => blocker.proceed?.();

    useEffect(() => {
        if (blocker.state === 'blocked') {
            onOpen();
        }
    }, [blocker, onOpen]);

    const onSubmit: SubmitHandler<RecipeSchema> = async (data) => {
        try {
            if (recipeData && id) {
                await updateRecipe({ id: id, body: data }).unwrap();
                unblockNavigation();
                navigate(ROUTER_PATHS.homePage);
            } else {
                await createRecipe(data).unwrap();
                unblockNavigation();
                navigate(ROUTER_PATHS.homePage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmitDraft = async () => {
        const isValidTitle = await trigger('title');
        if (!isValidTitle) return;

        const values = getValues();
        const touched = Object.keys(touchedFields);

        const draftData = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
                key,
                touched.includes(key) ? value : null,
            ]),
        );

        try {
            await createDraft(draftData).unwrap();
            unblockNavigation();
            navigate(ROUTER_PATHS.homePage);
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
                        onClick={onSubmitDraft}
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
