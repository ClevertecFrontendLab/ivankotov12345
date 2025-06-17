import { RecipeType } from './recipe';

type StatisticItem = {
    date: string;
    count: number;
};

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

export type UserStatistics = {
    likes: StatisticItem[];
    bookmarks: StatisticItem[];
    recommendationsCount: number;
};
