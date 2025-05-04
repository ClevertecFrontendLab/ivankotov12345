export const checkFiltersEmpty = (arrays: Record<string, string[]>) =>
    Object.values(arrays).every((array) => array.length === 0);
