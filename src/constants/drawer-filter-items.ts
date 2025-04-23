import { FilterItem } from '~/types/filter-item';

export const DRAWER_MEAT_ITEMS: FilterItem[] = [
    { item: 'chicken', label: 'Курица' },
    { item: 'pork', label: 'Свинина' },
    { item: 'beef', label: 'Говядина' },
    { item: 'turkey', label: 'Индейка' },
    { item: 'duck', label: 'Утка' },
];

export const DRAWER_SIDES_ITEMS: FilterItem[] = [
    { item: 'potatoes', label: 'Картошка' },
    { item: 'buckwheat', label: 'Гречка' },
    { item: 'pasta', label: 'Паста' },
    { item: 'spaghetti', label: 'Спагетти' },
    { item: 'rice', label: 'Рис' },
    { item: 'cabbage', label: 'Капуста' },
    { item: 'beans', label: 'Фасоль' },
    { item: 'vegetables', label: 'Другие овощи' },
];

export const AUTHORS_LIST: FilterItem[] = [
    { label: 'Елена Мин', item: 'Елена Мин' },
    { label: 'Мирием Чонишвили', item: 'Мирием Чонишвили' },
    { label: 'Елена Прекрасная', item: 'Елена Прекрасная' },
    { label: 'Alex Cook', item: 'Alex Cook' },
    { label: 'Екатерина Константинопольская', item: 'Екатерина Константинопольская' },
    { label: 'Инна Высоцкая', item: 'Инна Высоцкая' },
    { label: 'Сергей Разумов', item: 'Сергей Разумов' },
    { label: 'Анна Рогачева', item: 'Анна Рогачева' },
    { label: 'Иван Орлов', item: 'Иван Орлов' },
    { label: 'Повар Ши', item: 'Повар Ши' },
    { label: 'Только новые авторы', item: 'Только новые авторы' },
];

export const ALLERGENS_LIST: FilterItem[] = [
    { item: 'Молочные продукты', label: 'Молочные продукты' },
    { item: 'Яйцо', label: 'Яйцо' },
    { item: 'Рыба', label: 'Рыба' },
    { item: 'Моллюски', label: 'Моллюски' },
    { item: 'Орехи', label: 'Орехи' },
    { item: 'Томат', label: 'Томат' },
    { item: 'Цитрусовые', label: 'Цитрусовые' },
    { item: 'Клубника', label: 'Клубника' },
    { item: 'Шоколад', label: 'Шоколад' },
];
