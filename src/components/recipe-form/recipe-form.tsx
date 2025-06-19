import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, HStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';

import { EDIT_DRAFT_ITEM_PATH, ROUTER_PATHS } from '~/constants/router-paths';
import { CREATE_DRAFT_STATUS, CREATE_RECIPE_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { DATA_TEST_ID } from '~/constants/test-id';
import { RecipeSchema, recipeSchema } from '~/constants/validation-schemas/recipe';
import { getPathToRecipe } from '~/helpers/get-path-to-recipe';
import {
    useCreateDraftMutation,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} from '~/query/services/create-recipe';
import { useGetRecipeQuery } from '~/query/services/recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setToastData, setToastIsOpen } from '~/store/slices/app-slice';
import { selectCategories, selectSubCategories } from '~/store/slices/category-slice';
import { selectCurrentUser } from '~/store/slices/user-slice';
import { ToastStatus } from '~/types/toast-status';

import { DEFAULT_RECIPE_FORM_VALUES } from './constants';
import { setDefaultFormValues } from './helpers/set-default-form-values';
import { useBlockerNavigation } from './hooks';
import { ModalBlockNavigation } from './modal-block-navigation';
import { RecipeDescription } from './recipe-description';
import { RecipeIngredients } from './recipe-ingredients';
import { RecipeSteps } from './recipe-steps';

export const RecipeForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        control,
        register,
        setValue,
        reset,
        trigger,
        handleSubmit,
        getValues,
        formState: { errors, isDirty, dirtyFields },
    } = useForm({
        resolver: zodResolver(recipeSchema),
        defaultValues: { ...DEFAULT_RECIPE_FORM_VALUES },
    });

    const navigate = useNavigate();

    const [pathToRecipe, setPathToRecipe] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<ToastStatus>();

    const categories = useAppSelector(selectCategories);
    const subCategories = useAppSelector(selectSubCategories);
    const currentUser = useAppSelector(selectCurrentUser);

    const { id } = useParams();
    const { pathname } = useLocation();

    const isDraft = pathname.includes(EDIT_DRAFT_ITEM_PATH);

    const { data: recipeData } = useGetRecipeQuery(id && !isDraft ? id : skipToken);

    const draftData = currentUser?.drafts.find(({ _id }) => _id === id);

    const [createRecipe, { isSuccess: isSuccessCreateRecipe }] = useCreateRecipeMutation();
    const [updateRecipe, { isSuccess: isSuccessUpdateRecipe }] = useUpdateRecipeMutation();
    const [createDraft, { isSuccess: isSuccessCreateDraft }] = useCreateDraftMutation();

    const shouldBlockNavigation =
        isDirty && !isSuccessCreateRecipe && !isSuccessUpdateRecipe && !isSuccessCreateDraft;

    const { isOpen, unblockNavigation, blockNavigation } =
        useBlockerNavigation(shouldBlockNavigation);

    const onSubmit: SubmitHandler<RecipeSchema> = async (data) => {
        const recipePath = getPathToRecipe(categories, data.categoriesIds, subCategories);

        if (recipeData && id) {
            const response = await updateRecipe({ id: id, body: data }).unwrap();
            setToastMessage(CREATE_RECIPE_STATUS[RESPONSE_STATUS.SUCCESS]);
            dispatch(setToastIsOpen(true));
            setPathToRecipe(`/${recipePath}/${response._id}`);
        } else {
            const response = await createRecipe(data).unwrap();
            setPathToRecipe(`/${recipePath}/${response._id}`);
            setToastMessage(CREATE_RECIPE_STATUS[RESPONSE_STATUS.SUCCESS]);
            dispatch(setToastIsOpen(true));
        }
    };

    const onSubmitDraft = async () => {
        const isValidTitle = await trigger('title');
        if (!isValidTitle) return;

        const values = getValues();
        const touched = Object.keys(dirtyFields);

        const draftData = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
                key,
                touched.includes(key) ? value : null,
            ]),
        );

        await createDraft(draftData).unwrap();
        setToastMessage(CREATE_DRAFT_STATUS[RESPONSE_STATUS.SUCCESS]);
        setPathToRecipe(ROUTER_PATHS.homePage);
        dispatch(setToastIsOpen(true));
        navigate(ROUTER_PATHS.homePage);
    };

    useEffect(() => {
        if (recipeData) {
            setDefaultFormValues(recipeData, reset);
        }
        if (draftData) {
            setDefaultFormValues(draftData, reset);
        }
    }, [recipeData, draftData, reset]);

    useEffect(() => {
        if (
            (isSuccessCreateRecipe || isSuccessUpdateRecipe || isSuccessCreateDraft) &&
            pathToRecipe
        ) {
            navigate(pathToRecipe);
            dispatch(setToastData(toastMessage));
        }
    }, [
        isSuccessCreateRecipe,
        isSuccessUpdateRecipe,
        isSuccessCreateDraft,
        toastMessage,
        navigate,
        pathToRecipe,
        dispatch,
    ]);

    return (
        <Box
            as='form'
            mt={14}
            mb={{ base: 32, lg: 9 }}
            onSubmit={handleSubmit(onSubmit)}
            data-test-id={DATA_TEST_ID.recipeForm}
        >
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

                <HStack justifyContent='center' mt={10} flexDir={{ base: 'column', md: 'row' }}>
                    <Button
                        size='lg'
                        variant={STYLE_VARIANTS.outline}
                        borderColor={COLORS_BLACK_ALPHA[600]}
                        leftIcon={<EditIcon />}
                        onClick={onSubmitDraft}
                        data-test-id={DATA_TEST_ID.recipeSaveDraftButton}
                        w={{ base: SIZES.full, md: SIZES.auto }}
                    >
                        Сохранить черновик
                    </Button>
                    <Button
                        size='lg'
                        variant={STYLE_VARIANTS.black}
                        w={{ base: SIZES.full, md: SIZES.auto }}
                        type='submit'
                        data-test-id={DATA_TEST_ID.recipePublishRecipeButton}
                    >
                        Опубликовать рецепт
                    </Button>
                </HStack>
            </Box>

            <ModalBlockNavigation
                unblockNavigation={unblockNavigation}
                isOpen={isOpen}
                onClose={blockNavigation}
                onSubmitDraft={onSubmitDraft}
            />
        </Box>
    );
};
