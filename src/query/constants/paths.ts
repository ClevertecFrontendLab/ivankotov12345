export const BASE_URL = 'https://marathon-api.clevertec.ru';
export const IMAGES_BASE_URL = 'https://training-api.clevertec.ru';

export enum Endpoints {
    CATEGORY = 'category',
    RECIPE = 'recipe',
    RECIPES_BY_CATEGORY = 'recipe/category',
    SIGN_IN = 'auth/login',
    SIGN_UP = 'auth/signup',
    CHECK_AUTH = 'auth/check-auth',
    REFRESH_TOKEN = 'auth/refresh',

    FORGOT_PASSWORD = 'auth/forgot-password',
    VERIFY_OTP = 'auth/verify-otp',
    RESET_AUTH_DATA = 'auth/reset-password',
    LOAD_IMAGE = 'file/upload',
    MEASURE_UNITS = 'measure-units',
    CREATE_DRAFT = 'recipe/draft',
    LIKE = 'like',
    BOOKMARK = 'bookmark',
    BLOGGERS = 'bloggers',
    TOGGLE_SUBSCRIPTION = 'users/toggle-subscription',
    BLOGGER_RECIPES = 'recipe/user',
}

export const ACCESS_TOKEN = 'Authentication-Access';
