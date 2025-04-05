import bread from '~/assets/svg/bread.svg';
import eggplant from '~/assets/svg/eggplant.svg';
import fruit from '~/assets/svg/fruit.svg';
import grill from '~/assets/svg/grill.svg';
import international from '~/assets/svg/international.svg';
import kid from '~/assets/svg/kid.svg';
import leave from '~/assets/svg/leave.svg';
import mortairAndPestle from '~/assets/svg/mortair-and-pestle.svg';
import mug from '~/assets/svg/mug.svg';
import pan from '~/assets/svg/pan.svg';
import pickles from '~/assets/svg/pickles.svg';
import pot from '~/assets/svg/pot.svg';
import potWithCross from '~/assets/svg/pot-with-cross.svg';
import { NavMenuItem } from '~/types/nav-menu';

export const NAV_MENU_ITEMS: NavMenuItem[] = [
    {
        category: 'Салаты',
        imgSrc: eggplant,
        subCategories: ['Мясные салаты', 'Рыбные салаты', 'Овощные салаты', 'Теплые салаты'],
    },
    {
        category: 'Закуски',
        imgSrc: fruit,
        subCategories: [
            'Мясные закуски',
            'Рыбные закуски',
            'Овощные закуски',
            'Теплые закуски',
            'Бутерброды',
            'Фастфуд',
        ],
    },
    {
        category: 'Первые блюда',
        imgSrc: pot,
        subCategories: [
            'Мясные супы',
            'Овощные супы',
            'Бульоны',
            'Холодные супы',
            'Диетические супы',
        ],
    },
    {
        category: 'Вторые блюда',
        imgSrc: pan,
        subCategories: [
            'Мясные',
            'Рыбные',
            'Овощные',
            'Из птицы',
            'Из грибов',
            'Из субпродуктов',
            'На пару',
            'Пельмени, вареники',
            'Мучные гарниры',
            'Овощные гарниры',
            'Пицца',
            'Суши',
        ],
    },
    {
        category: 'Десерты и выпечка',
        imgSrc: bread,
        subCategories: [
            'Блины и оладьи',
            'Пироги и пончики',
            'Торты',
            'Рулеты',
            'Кексы и маффины',
            'Сырники и ватрушки',
            'Из слоеного теста',
            'Из заварного теста',
            'Из дрожжевого теста',
            'Булочки и сдоба',
            'Хлеб',
            'Тесто на пиццу',
            'Кремы',
        ],
    },
    {
        category: 'Блюда на гриле',
        imgSrc: grill,
        subCategories: ['Говядина', 'Свинина', 'Птица', 'Рыба', 'Грибы', 'Овощи'],
    },
    {
        category: 'Веганские блюда',
        imgSrc: leave,
        subCategories: [
            'Закуски',
            'Первые блюда',
            'Вторые блюда',
            'Гарниры',
            'Десерты',
            'Выпечка',
            'Сыроедческие блюда',
            'Напитки',
        ],
    },
    {
        category: 'Детские блюда',
        imgSrc: kid,
        subCategories: [
            'Первые блюда',
            'Вторые блюда',
            'Гарниры',
            'Выпечка',
            'Без глютена',
            'Без сахара',
            'Без аллергенов',
            'Блюда для прикорма',
        ],
    },
    {
        category: 'Лечебное питание',
        imgSrc: potWithCross,
        subCategories: [
            'Детская диета',
            'Диета №1',
            'Диета №2',
            'Диета №3',
            'Диета №5',
            'Диета №6',
            'Диета №7',
            'Диета №8',
            'Диета №9',
            'Диета №10',
            'Диета №11',
            'Диета №12',
            'Диета №13',
            'Диета №14',
            'Без глютена',
            'Без аллергенов',
        ],
    },
    {
        category: 'Национальные блюда',
        imgSrc: international,
        subCategories: [
            'Американская кухня',
            'Армянская кухня',
            'Греческая кухня',
            'Грузинская кухня',
            'Итальянская кухня',
            'Испанская кухня',
            'Китайская кухня',
            'Мексиканская кухня',
            'Паназиатская кухня',
            'Русская кухня',
            'Турецкая кухня',
            'Французская кухня',
            'Шведская кухня',
            'Японская кухня',
            'Другая кухня',
        ],
    },
    {
        category: 'Соусы',
        imgSrc: mortairAndPestle,
        subCategories: ['Соусы мясные', 'Соусы сырные', 'Маринады'],
    },
    {
        category: 'Домашние заготовки',
        imgSrc: pickles,
        subCategories: [
            'Мясные заготовки',
            'Рыбные заготовки',
            'Из огурцов',
            'Из томатов',
            'Из грибов',
            'Овощные заготовки',
            'Салаты, икра',
            'Из фруктов и ягод',
        ],
    },
    {
        category: 'Напитки',
        imgSrc: mug,
        subCategories: [
            'Соки и фреши',
            'Смузи',
            'Компоты',
            'Кисели',
            'Кофе',
            'Лечебный чай',
            'Квас',
            'Коктейли',
            'Алкогольные',
        ],
    },
];
