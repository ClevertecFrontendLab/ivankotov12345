import { NavMenuItem, Subcategory } from '~/types/nav-menu';

export const setLocalStorageItem = (key: string, item: NavMenuItem[] | Subcategory[]) =>
    localStorage.setItem(key, JSON.stringify(item));

export const getLocalStorageItem = (key: string) => {
    const storageItem = localStorage.getItem(key);
    return storageItem ? JSON.parse(storageItem) : [];
};
