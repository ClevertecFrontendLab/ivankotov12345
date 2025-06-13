import { RecipeType } from './recipe';

export type BloggerNotes = {
    date: string;
    text: string;
};

export type BloggerType = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: BloggerNotes[];
    newRecipesCount: number;
    avatar?: string;
};

export type BloggerResponse = {
    favorites: BloggerType[];
    others: BloggerType[];
};

export type SubscriptionRequest = {
    toUserId: string;
    fromUserId: string;
};

export type BloggerInfo = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: RecipeType[];
    subscriptions: string[];
    subscribers: string[];
    avatar?: string;
};

export type BloggerInfoResponse = {
    bloggerInfo: BloggerInfo;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: false;
};

export type BloggerActivityInfo = {
    notes: BloggerNotes[];
    recipes: RecipeType[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
};
