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
    index?: number;
    recommendedBy?: Omit<UserData, 'email'>;
};

export type BlogCardData = {
    id: number;
    user: UserData;
    message: string;
};
