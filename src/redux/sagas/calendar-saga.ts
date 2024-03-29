import { push } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getCalendarError, getCalendarFetch, getCalendarSuccess } from '@redux/slices/calendar';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { Paths } from '@typing/enums/paths';
import { NavigateErrorMessage } from '@typing/enums/result-messages';

function* calendarWorker() {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.TRAINING,
    );

    yield put(getCalendarSuccess(data));
    yield put(push(Paths.CALENDAR));
  } catch(error) {
    yield put(getCalendarError({
      status: NavigateErrorMessage.status,
      title: NavigateErrorMessage.title,
      subTitle: NavigateErrorMessage.subTitle,
      buttonText: NavigateErrorMessage.buttonText,
      buttonLink: Paths.MAIN,
    }));
  }
}

export function* calendarWatcher() {
  yield takeLatest(getCalendarFetch.type, calendarWorker);
}