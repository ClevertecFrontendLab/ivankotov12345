import { z } from 'zod';

import { EMPTY_MESSAGE } from './validation-error-messages';

const ingredient = z.object({
    title: z.string().min(1, EMPTY_MESSAGE).nullable(),
    count: z.number().min(1, EMPTY_MESSAGE).nullable(),
    measureUnit: z.string().nullable(),
});

const step = z.object({
    stepNumber: z.number().nullable(),
    description: z.string().min(1, EMPTY_MESSAGE).max(300, EMPTY_MESSAGE).nullable(),
    image: z.string().nullable(),
});

export const recipeSchema = z.object({
    categoriesIds: z.array(z.string()).min(3, EMPTY_MESSAGE),
    title: z.string().min(1, EMPTY_MESSAGE).max(50, EMPTY_MESSAGE),
    description: z.string().min(1, EMPTY_MESSAGE).max(500, EMPTY_MESSAGE),
    portions: z.number().min(1, EMPTY_MESSAGE).nullable(),
    time: z.number().min(1, EMPTY_MESSAGE).nullable(),
    image: z.string().min(1, EMPTY_MESSAGE),
    ingredients: z.array(ingredient),
    steps: z.array(step),
});

export type RecipeSchema = z.output<typeof recipeSchema>;
