export const makeNewRecipeCountString = (count: number) => {
    const lastDigit = count % 10;

    if (lastDigit === 1) {
        return `${count} новый рецепт`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} новых рецепта`;
    } else {
        return `${count} новых рецептов`;
    }
};
