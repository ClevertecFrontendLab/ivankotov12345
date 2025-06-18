import { ToastStatus } from '~/types/toast-status';

export const RESPONSE_STATUS = {
    SUCCESS: 200,
    OK: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

export const ALERT_ERROR_TEXT: ToastStatus = {
    status: 'error',
    title: 'Ошибка сервера',
    description: 'Попробуйте немного позже.',
};
export const LIKE_RECIPE_ERROR: ToastStatus = {
    status: 'error',
    title: 'Ошибка сервера',
    description: 'Попробуйте немного позже',
};

const ERROR_RECIPE_EXISTS: ToastStatus = {
    status: 'error',
    title: 'Ошибка',
    description: 'Рецепт с таким названием уже существует',
};

export const AUTH_SERVER_ERROR: ToastStatus = {
    status: 'error',
    title: 'Ошибка сервера',
    description: 'Попробуйте немного позже',
};

export const USER_ERROR: ToastStatus = {
    status: 'error',
    title: 'Ошибка сервера',
    description: 'Попробуйте позже.',
};

export const VERIFIES_SUCCESS: ToastStatus = {
    status: 'success',
    title: 'Верификация прошла успешно',
};

export const RESTORE_DATA_SUCCESS: ToastStatus = {
    status: 'success',
    title: 'Восстановление данных успешно',
};

export const AUTHORIZATION_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.FORBIDDEN]: {
        status: 'error',
        title: 'E-mail не верифицирован',
        description: 'Проверьте почту и перейдите по ссылке',
    },
    [RESPONSE_STATUS.UNAUTHORIZED]: {
        status: 'error',
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова.',
    },
};

export const EMAIL_VERIFICATION_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.FORBIDDEN]: {
        status: 'error',
        title: 'Такого e-mail нет',
        description: 'Попробуйте другой e-mail или проверьте правильность его написания',
    },
};

export const CREATE_RECIPE_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.SUCCESS]: {
        status: 'success',
        title: 'Рецепт успешно опубликован',
    },
    [RESPONSE_STATUS.CONFLICT]: ERROR_RECIPE_EXISTS,
    [RESPONSE_STATUS.SERVER_ERROR]: {
        status: 'error',
        title: 'Ошибка сервера',
        description: 'Попробуйте пока сохранить в черновик.',
    },
};

export const DELETE_RECIPE_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.SUCCESS]: {
        status: 'success',
        title: 'Рецепт успешно удален',
    },
    [RESPONSE_STATUS.SERVER_ERROR]: {
        status: 'error',
        title: 'Ошибка сервера',
        description: 'Не удалось удалить рецепт',
    },
};

export const CREATE_DRAFT_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.SUCCESS]: {
        status: 'success',
        title: 'Черновик успешно сохранен',
    },
    [RESPONSE_STATUS.CONFLICT]: ERROR_RECIPE_EXISTS,
    [RESPONSE_STATUS.SERVER_ERROR]: {
        status: 'error',
        title: 'Ошибка сервера',
        description: 'Не удалось сохранить черновик рецепта',
    },
};

export const LOAD_IMAGE_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.SERVER_ERROR]: {
        status: 'error',
        title: 'Ошибка сервера',
        description: 'Попробуйте сохранить фото позже.',
    },
};

export const CREATE_NOTE_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.OK]: {
        status: 'success',
        title: 'Заметка опубликована',
    },
    [RESPONSE_STATUS.SERVER_ERROR]: {
        ...USER_ERROR,
    },
};
export const DELETE_NOTE_STATUS: Record<number, ToastStatus> = {
    [RESPONSE_STATUS.OK]: {
        status: 'success',
        title: 'Заметка удалена',
    },
    [RESPONSE_STATUS.SERVER_ERROR]: {
        ...USER_ERROR,
    },
};
