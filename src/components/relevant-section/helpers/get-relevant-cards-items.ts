import { RecipeType } from '~/types/recipe';

const CARD_DATA_LIMIT = 5;
const CARDS_LENGTH = 2;

export const getRelevantCardsItems = (array: RecipeType[] | undefined) => {
    const cardsData = array?.slice(0, CARDS_LENGTH);
    const cardsDataMini = array?.slice(CARDS_LENGTH, CARD_DATA_LIMIT);

    return { cardsData, cardsDataMini };
};
