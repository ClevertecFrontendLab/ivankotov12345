import { NavMenuItem, Subcategory } from '~/types/nav-menu';

export const setLocalStorageItem = (key: string, item: NavMenuItem[] | Subcategory[] | string) =>
    localStorage.setItem(key, JSON.stringify(item));

export const getLocalStorageItem = (key: string) => {
    const storageItem = localStorage.getItem(key);
    if (storageItem) {
        return JSON.parse(storageItem);
    }
};

export const removeLocalStorageItem = (key: string) => localStorage.removeItem(key);
