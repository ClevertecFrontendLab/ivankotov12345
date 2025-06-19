export const ROUTER_PATHS = {
    homePage: '/',
    signIn: '/signin',
    signUp: '/signup',
    restoreAuthData: '/signin/restore-auth-data',
    verification: '/verification',
    juiciestPage: '/the-juiciest',
    newRecipe: '/new-recipe',
    blogs: '/blogs',
    userProfile: '/profile',
    blogggerProfile: '/blogs/:bloggerId',
    category: ':category',
    subcategory: ':category/:subcategory',
    editRecipe: '/edit-recipe/:category/:subcategory/:id',
    recipe: ':id',
    anyRoute: '*',
    notFound: '/not-found',
    editDraft: '/edit-draft/:id',
    profileSetings: '/profile/settings',
};

export const EDIT_ITEM_PATH = '/edit-recipe';
export const EDIT_DRAFT_ITEM_PATH = '/edit-draft';
export const ANCHOR_NOTES = '#notes';
