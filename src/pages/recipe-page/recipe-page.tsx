import { Box, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { Сarousel } from '~/components/carousel';
import { UserCard } from '~/components/user-card';
import { COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { IngredientsTable } from '~/pages/recipe-page/components/ingredients-table';
import { NutritionValueSection } from '~/pages/recipe-page/components/nutrition-value-section';
import { RecipePageCard } from '~/pages/recipe-page/components/recipe-page-card';
import { StepCard } from '~/pages/recipe-page/components/step-card';
import { useGetBloggerByIdQuery } from '~/query/services/blogs';
import { useGetRecipeQuery } from '~/query/services/recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectUserId } from '~/store/slices/app-slice';
import { clearSelectedRecipeTitle } from '~/store/slices/selected-recipe-slice';

export const RecipePage: React.FC = () => {
    const userId = useAppSelector(selectUserId);

    const { id } = useParams();
    const { data } = useGetRecipeQuery(id as string);

    const dispatch = useAppDispatch();

    const { data: bloggerData } = useGetBloggerByIdQuery({
        bloggerId: data?.authorId,
        currentUserId: userId,
    });

    const isUserAuthor = userId === data?.authorId;

    useEffect(
        () => () => {
            dispatch(clearSelectedRecipeTitle());
        },
        [id, dispatch],
    );

    return (
        <>
            {data && (
                <VStack gap={10} mt={{ base: 6, lg: 14 }} mb={20}>
                    <RecipePageCard {...data} />

                    <VStack gap={10} maxW={SIZES.recipeDetailsMaxWidth}>
                        <NutritionValueSection {...data.nutritionValue} />
                        <IngredientsTable ingredients={data.ingredients} portions={data.portions} />

                        <VStack as='section' w={SIZES.full} gap={5} alignItems='start'>
                            <Heading variant={STYLE_VARIANTS.sectionHeading}>
                                Шаги приготовления
                            </Heading>
                            {data.steps.map((step, index) => (
                                <StepCard
                                    key={step.stepNumber}
                                    {...step}
                                    background={
                                        index === data.steps.length - 1
                                            ? COLORS_LIME[50]
                                            : COLORS_BLACK_ALPHA[100]
                                    }
                                />
                            ))}
                        </VStack>

                        {bloggerData?.bloggerInfo && !isUserAuthor && <UserCard {...bloggerData} />}
                    </VStack>

                    <Box w={SIZES.full}>
                        <Сarousel />
                    </Box>
                </VStack>
            )}
        </>
    );
};
