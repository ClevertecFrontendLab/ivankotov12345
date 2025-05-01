import { useEffect } from 'react';

import { filterRecipesByAllergens } from '~/helpers/filter-recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectAllergensFilter } from '~/store/slices/filters-slice';
import { setFilteredRecipes } from '~/store/slices/recipe-slice';
import { RecipeType } from '~/types/recipe';

export const useAllergenFilter = (recipes: RecipeType[]) => {
    const dispatch = useAppDispatch();
    const selectedAllergens = useAppSelector(selectAllergensFilter);

    useEffect(() => {
        if (!recipes.length) return;
        const filteredCards = filterRecipesByAllergens(selectedAllergens, recipes);

        dispatch(setFilteredRecipes(filteredCards));
    }, [dispatch, selectedAllergens, recipes]);
};
