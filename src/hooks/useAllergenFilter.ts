import { useEffect } from 'react';

import { filterRecipesByAllergens } from '~/helpers/filter-recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectAllergens } from '~/store/slices/allergens-slice';
import { setFilteredRecipes } from '~/store/slices/flter-recipe-slice';
import { RecipeType } from '~/types/recipe';

export const useAllergenFilter = (recipes: RecipeType[]) => {
    const dispatch = useAppDispatch();
    const { selectedAllergensList } = useAppSelector(selectAllergens);

    useEffect(() => {
        if (!recipes.length) return;
        const filteredCards = filterRecipesByAllergens(selectedAllergensList, recipes);

        dispatch(setFilteredRecipes(filteredCards));
    }, [dispatch, selectedAllergensList, recipes]);
};
