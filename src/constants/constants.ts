export const MOBILE_WIDTH = 675;

export const MODAL_WIDTH_DESKTOP = 539;
export const MODAL_WIDTH_MOBILE = 539;
export const MODAL_WIDTH_CALENDAR = 384;

export const DRAWER_WIDTH_DESKTOP = 408;
export const DRAWER_WIDTH_MOBILE = '100%';

export const EMPTY_EXERCISE = {
  name: '',
  replays: 0,
  weight: 0,
  approaches: 1,
  isImplementation: false,
}

export const FORMAT_DATE_IN_VIEW = 'DD.MM.YYYY';
export const FORMAT_DATE_IN_VIEW_SHORT = 'DD.MM'
export const FORMAT_DATE_PAYLOAD = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export const MAX_IMAGE_SIZE = 5;
export const IMAGE_URL_BASE = 'https://training-api.clevertec.ru/';

export const PRIMARY_LIGHT_6_COLOR = '#2f54eb';

export const PERIODS_MAP = new Map()
              .set(1,'Через 1 день')
              .set(2, 'Через 2 дня')
              .set(3, 'Через 3 дня')
              .set(4, 'Через 4 дня')
              .set(5, 'Через 5 дней')
              .set(6, 'Через 6 дней')
              .set(7, 'Через 1 неделю')