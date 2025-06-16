import { RecipeType } from './recipe';

export type UserData = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: Partial<RecipeType>[];
    subscriptions: string[];
    subscribers: string[];
};
