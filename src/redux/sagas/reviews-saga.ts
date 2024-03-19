import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { AxiosError } from 'axios';
import { push } from 'redux-first-history';

import { AxiosPaths } from '@typing/enums/axios-paths';
import { getReviewsError, getReviewsSuccess } from '@redux/slices/reviews';
import { Paths } from '@typing/enums/paths';
import { NavigateErrorMessage } from '@typing/enums/result-messages';
import { ErrorStatus } from '@typing/enums/error-status';

function* reviewsWorker() {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.FEEDBACK,
    );
    yield put(getReviewsSuccess(data));
  } catch(error) {
    const { response } = error as AxiosError;
    if(response?.status === ErrorStatus.FORBIDDEN) {
      yield localStorage.removeItem('token');
      yield sessionStorage.removeItem('token');
      yield put(push(Paths.AUTH));
    } else {
      yield put(getReviewsError({
        status: NavigateErrorMessage.status,
        title: NavigateErrorMessage.title,
        subTitle: NavigateErrorMessage.subTitle,
        buttonText: NavigateErrorMessage.buttonText,
        buttonLink: Paths.MAIN,
      }));
    }
  }
}

export function* reviewsWatcher() {
  yield takeLatest('reviews/getReviewsFetch', reviewsWorker);
}