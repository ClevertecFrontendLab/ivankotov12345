import { ToastStatus } from '~/types/toast-status';

export const RESPONSE_STATUS = {
    BAD_REQUEST: 400,
};

export const ALERT_ERROR_TEXT: ToastStatus = {
    status: 'error',
    title: ' Ошибка сервера',
    description: 'Попробуйте поискать снова попозже',
};

export const VERIFIES_SUCCESS: ToastStatus = {
    status: 'success',
    title: 'Верификация прошла успешно',
};
