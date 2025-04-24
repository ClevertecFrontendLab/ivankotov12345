import { Box, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { Сarousel } from '~/components/carousel';
import { IngredientsTable } from '~/components/ingredients-table';
import { NutritionValueSection } from '~/components/nutrition-value-section';
import { RecipePageCard } from '~/components/recipe-page-card';
import { StepCard } from '~/components/step-card';
import { UserCard } from '~/components/user-card';
import { CARD_DATA } from '~/constants/card-data';
import { useAppDispatch } from '~/store/hooks';
import { clearSelectedRecipe, setSelectedRecipe } from '~/store/slices/selected-recipe-slice';
import { RecipeType } from '~/types/recipe';

export const RecipePage: React.FC = () => {
    const { pathname } = useLocation();

    const [, , currId] = pathname.split('/').filter(Boolean);
    const recipe = CARD_DATA.find(({ id }) => id === currId) || null;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSelectedRecipe(recipe));
        return () => {
            dispatch(clearSelectedRecipe());
        };
    }, [recipe, dispatch]);

    const {
        image,
        title,
        description,
        category,
        bookmarks,
        likes,
        time,
        nutritionValue,
        ingredients,
        steps,
        portions,
    } = recipe as unknown as RecipeType;
    return (
        <VStack gap={10} mt={{ base: 6, lg: 14 }} mb={20}>
            <RecipePageCard
                image={image}
                title={title}
                description={description}
                category={category}
                bookmarks={bookmarks}
                likes={likes}
                time={time}
            />

            <VStack gap={10} maxW='recipeDetailsMaxWidth'>
                <NutritionValueSection {...nutritionValue} />
                <IngredientsTable ingredients={ingredients} portions={portions} />

                <VStack as='section' w='full' gap={5} alignItems='start'>
                    <Heading variant='sectionHeader'>Шаги приготовления</Heading>
                    {steps.map((step, index) => (
                        <StepCard
                            key={step.stepNumber}
                            {...step}
                            background={index === steps.length - 1 ? 'lime.50' : 'blackAlpha.100'}
                        />
                    ))}
                </VStack>

                <UserCard />
            </VStack>

            <Box w='full'>
                <Сarousel />
            </Box>
        </VStack>
    );
};
