import { RecipeType } from './recipe';

export type UserData = {
    avatar?: string;
    name: string;
    email: string;
};

export type CardData = Pick<
    RecipeType,
    | 'id'
    | 'image'
    | 'title'
    | 'description'
    | 'category'
    | 'subcategory'
    | 'bookmarks'
    | 'likes'
    | 'time'
> & {
    recommendedBy?: Omit<UserData, 'email'>;
};

export type BlogCardData = {
    id: number;
    user: UserData;
    message: string;
};
