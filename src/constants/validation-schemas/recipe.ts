import { z } from 'zod';

export const recipeSchema = z
    .object({
        title: z.string().max(50).nonempty(),
        description: z.string().max(500).nonempty(),
        portions: z.number().positive(),
        time: z.number().positive().max(10000),
        image: z.string().min(1).nonempty(),
        categoriesIds: z.array(z.unknown()).min(3).nonempty(),
        ingredients: z.array(
            z.object({
                title: z.string().max(50).nonempty(),
                count: z.number().positive(),
                measureUnit: z.string().nonempty(),
            }),
        ),
        steps: z
            .array(
                z.object({
                    stepNumber: z.number(),
                    description: z.string().max(300).nonempty(),
                    image: z.string().nullable(),
                }),
            )
            .nullable(),
    })
    .required();

export type RecipeSchema = z.output<typeof recipeSchema>;
