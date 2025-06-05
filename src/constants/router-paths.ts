export const ROUTER_PATHS = {
    homePage: '/',
    signIn: '/signin',
    signUp: '/signup',
    restoreAuthData: '/signin/restore-auth-data',
    verification: '/verification',
    juiciestPage: '/the-juiciest',
    newRecipe: '/new-recipe',
    blogs: '/blogs',
    blogggerProfile: '/blogs/:bloggerId',
    category: ':category',
    subcategory: ':category/:subcategory',
    editRecipe: '/edit-recipe/:category/:subcategory/:id',
    recipe: ':id',
    anyRoute: '*',
    notFound: '/not-found',
};

export const EDIT_ITEM_PATH = '/edit-recipe';
export const ANCHOR_NOTES = '#notes';
