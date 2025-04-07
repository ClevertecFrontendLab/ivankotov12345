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

export const CARD_BADGE_ITEMS: Record<string, string> = {
    Салаты: eggplant,
    Закуски: fruit,
    'Первые блюда': pot,
    'Вторые блюда': pan,
    'Десерты, выпечка': bread,
    'Блюда на гриле': grill,
    'Веганские блюда': leave,
    'Детские блюда': kid,
    'Лечебное питание': potWithCross,
    Национальные: international,
    Соусы: mortairAndPestle,
    Напитки: mug,
    Заготовки: pickles,
};
