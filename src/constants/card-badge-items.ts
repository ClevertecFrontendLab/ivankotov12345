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

export const CARD_BADGE_ITEMS: Record<string, { image: string; title: string }> = {
    salads: { image: eggplant, title: 'Салаты' },
    snacks: { image: fruit, title: 'Закуски' },
    'first-dish': { image: pot, title: 'Первые блюда' },
    'second-dish': { image: pan, title: 'Вторые блюда' },
    desserts: { image: bread, title: 'Десерты и выпечка' },
    grill: { image: grill, title: 'Блюда на гриле' },
    vegan: { image: leave, title: 'Веганская кухня' },
    kid: { image: kid, title: 'Детские блюда' },
    medical: { image: potWithCross, title: 'Лечебное питание' },
    national: { image: international, title: 'Национальные' },
    sauces: { image: mortairAndPestle, title: 'Соусы' },
    drinks: { image: mug, title: 'Напитки' },
    pickled: { image: pickles, title: 'Заготовки' },
};
