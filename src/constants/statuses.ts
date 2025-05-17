import { ToastStatus } from '~/types/toast-status';

export const RESPONSE_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
};

export const ALERT_ERROR_TEXT: ToastStatus = {
    status: 'error',
    title: 'Ошибка сервера',
    description: 'Попробуйте поискать снова попозже',
};

export const VERIFIES_SUCCESS: ToastStatus = {
    status: 'success',
    title: 'Верификация прошла успешно',
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
