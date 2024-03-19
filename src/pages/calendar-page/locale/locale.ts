import { PickerLocale } from 'antd/lib/date-picker/generatePicker';

export const localeRU: PickerLocale = {
    lang: {
      locale: 'ru_RU',
      placeholder: 'Выберите дату',
      rangePlaceholder: ['Начальная дата', 'Конечная дата'],
      today: 'Сегодня',
      now: 'Сейчас',
      backToToday: 'Back to today',
      ok: 'OK',
      clear: 'Clear',
      month: 'Месяц',
      year: 'Год',
      timeSelect: 'Выберите время',
      dateSelect: 'Выберите дату',
      monthSelect: 'Выберите месяц',
      yearSelect: 'Выберите год',
      decadeSelect: 'выберите декаду',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthFormat: 'MMMM',
      monthBeforeYear: true,
      previousMonth: 'Предыдущий месяц (PageUp)',
      nextMonth: 'Следующий месяц (PageDown)',
      previousYear: 'Предыдущий год (Control + left)',
      nextYear: 'Следующий год (Control + right)',
      previousDecade: 'Предыдущая декада',
      nextDecade: 'Следующая декада',
      previousCentury: 'Предыдущий век',
      nextCentury: 'Следующий век',
      shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      shortMonths: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек'
      ]
    },
    timePickerLocale: {
      placeholder: 'Выберите время'
    },
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    weekFormat: 'YYYY-wo',
    monthFormat: 'YYYY-MM'
  }