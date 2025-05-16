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

export const WRONG_LOGIN_OR_PASSWORD: ToastStatus = {
    status: 'error',
    title: 'Неверный логин или пароль',
    description: 'Попробуйте снова.',
};

export const EMAIL_NOT_VERIFIED: ToastStatus = {
    status: 'error',
    title: 'E-mail не верифицирован',
    description: 'Проверьте почту и перейдите по ссылке',
};
