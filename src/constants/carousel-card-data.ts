import cabbageCutlet from '~/assets/img/cabbage-cutlet.jpg';
import kefirPancakes from '~/assets/img/kefir-pancake.jpg';
import salad from '~/assets/img/salad.jpg';
import solanka from '~/assets/img/solanka.jpg';
import { CardData } from '~/types/card-data';

export const CAROUSEL_CARD_DATA: CardData[] = [
    {
        id: 1,
        imgSrc: solanka,
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: 'Первые блюда',
        likes: 1,
    },
    {
        id: 2,
        imgSrc: cabbageCutlet,
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        category: 'Веганские блюда',
        likes: 2,
        favorites: 1,
    },
    {
        id: 3,
        imgSrc: kefirPancakes,
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        category: 'Десерты, выпечка',
        favorites: 1,
    },
    {
        id: 4,
        imgSrc: salad,
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        category: 'Салаты',
    },
    {
        id: 5,
        imgSrc: salad,
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        category: 'Салаты',
    },
];
