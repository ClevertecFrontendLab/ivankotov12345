import { FilterItem } from '~/types/filter-item';

export const getFilteredItems = (items: FilterItem[], selectedItems: string[]) =>
    items.filter(({ item }) => selectedItems.includes(item));
