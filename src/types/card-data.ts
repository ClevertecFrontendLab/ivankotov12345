import { RecepieType } from './recepie';

export type UserData = {
    avatar?: string;
    name: string;
    email: string;
};

export type CardData = Pick<
    RecepieType,
    'id' | 'image' | 'title' | 'description' | 'category' | 'bookmarks' | 'likes'
> & {
    recommendedBy?: Omit<UserData, 'email'>;
};

export type BlogCardData = {
    id: number;
    user: UserData;
    message: string;
};
