import { FOOD_CARD_TYPES } from '~/constants/food-card-types';

import { RecipeType } from './recipe';

export type UserData = {
    avatar?: string;
    name: string;
    email: string;
};

export type CardData = Pick<
    RecipeType,
    '_id' | 'image' | 'title' | 'description' | 'categoriesIds' | 'bookmarks' | 'likes' | 'time'
> & {
    cardType: keyof typeof FOOD_CARD_TYPES;
    index?: number;
    recommendedBy?: Omit<UserData, 'email'>;
};
