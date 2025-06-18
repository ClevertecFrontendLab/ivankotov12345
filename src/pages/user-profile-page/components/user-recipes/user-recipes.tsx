import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { LoadMoreButton } from '~/components/load-more-button';
import { FOOD_CARD_TYPES } from '~/constants/food-card-types';
import { RecipeType } from '~/types/recipe';

import { UserRecipesTitle } from './user-recipes-title';

type UserRecipesProps = {
    drafts: Partial<RecipeType>[];
    recipes: RecipeType[];
};

export const UserRecipes: React.FC<UserRecipesProps> = ({ drafts, recipes }) => {
    const [collapsed, setCollapsed] = useState(false);
    const userRecipesList = collapsed
        ? [...drafts, ...recipes]
        : [...drafts, ...recipes].slice(0, 8);

    const draftsLastIndex = drafts.length - 1;

    const onLoadMoreClick = () => setCollapsed(true);
    return (
        <Box mb={10}>
            <UserRecipesTitle recipesCount={recipes.length} draftsCount={drafts.length} />

            <CardsWrapper>
                {userRecipesList.map((recipe, index) => (
                    <FoodCard
                        key={recipe._id}
                        {...recipe}
                        cardType={
                            index <= draftsLastIndex
                                ? FOOD_CARD_TYPES.draft
                                : FOOD_CARD_TYPES.userRecipe
                        }
                    />
                ))}
            </CardsWrapper>

            {userRecipesList.length > 0 && !collapsed && (
                <LoadMoreButton onLoadMoreClick={onLoadMoreClick} isLoading={false} />
            )}
        </Box>
    );
};
