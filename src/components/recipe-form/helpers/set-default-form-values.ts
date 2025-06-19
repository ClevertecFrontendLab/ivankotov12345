import { UseFormReset } from 'react-hook-form';

import { RecipeSchema } from '~/constants/validation-schemas/recipe';
import { RecipeType } from '~/types/recipe';

export const setDefaultFormValues = (
    recipe: Partial<RecipeType>,
    reset: UseFormReset<RecipeSchema>,
) => {
    reset({
        categoriesIds: recipe.categoriesIds,
        title: recipe.title,
        description: recipe.description,
        portions: recipe.portions,
        time: recipe.time,
        image: recipe.image,
        ingredients: recipe.ingredients?.map(({ title, count, measureUnit }) => ({
            title: title,
            count: +count,
            measureUnit: measureUnit,
        })),
        steps: recipe.steps,
    });
};
