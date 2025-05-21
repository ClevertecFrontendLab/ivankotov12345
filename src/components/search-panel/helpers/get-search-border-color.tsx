import { COLORS, COLORS_BLACK_ALPHA, COLORS_LIME } from '~/constants/styles/colors';

export const getSearchBorderColor = (
    currentSearchValue: string,
    minSearchLength: number,
    isSearchFocused: boolean,
) => {
    if (!isSearchFocused) return COLORS_BLACK_ALPHA[600];

    if (currentSearchValue.length >= minSearchLength) {
        return COLORS_LIME[600];
    } else if (currentSearchValue.length === 0) {
        return COLORS.red;
    } else {
        return COLORS_BLACK_ALPHA[600];
    }
};
