import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { AxiosError } from 'axios';
import { push } from 'redux-first-history';

import { AxiosPaths } from '@typing/enums/axios-paths';
import { getReviewsError, getReviewsSuccess } from '@redux/slices/reviews';
import { Paths } from '@typing/enums/paths';
import { GetFeedbacksErrorMessage } from '@typing/enums/result-messages';

function* reviewsWorker() {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.FEEDBACK,
    );
    yield put(getReviewsSuccess(data));
  } catch(error) {
    const { response } = error as AxiosError;
    if(response?.status === 403) {
      yield localStorage.removeItem('token');
      yield put(push(Paths.AUTH));
    } else {
      yield put(getReviewsError({
        status: GetFeedbacksErrorMessage.status,
        title: GetFeedbacksErrorMessage.title,
        subTitle: GetFeedbacksErrorMessage.subTitle,
        buttonText: GetFeedbacksErrorMessage.buttonText,
        buttonLink: Paths.MAIN,
      }))
    }
  }
}

export function* reviewsWatcher() {
  yield takeLatest('reviews/getReviewsFetch', reviewsWorker);
}