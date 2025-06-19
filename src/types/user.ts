import { BloggerNotes } from './blogger';
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
    notes: BloggerNotes[];
    drafts: Partial<RecipeType>[];
    subscriptions: string[];
    subscribers: string[];
    photoLink?: string;
};

export type UserStatistics = {
    likes: StatisticItem[];
    bookmarks: StatisticItem[];
    recommendationsCount: number;
};
