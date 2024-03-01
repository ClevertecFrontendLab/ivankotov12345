import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import { instance } from '@axios/axios';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { getReviewsSuccess } from '@redux/slices/reviews';
import { Paths } from '@typing/enums/paths';


function* reviewsWorker() {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.FEEDBACK,
    );
    yield put(getReviewsSuccess(data));
    yield put(push(Paths.FEEDBACKS))
  } catch(error) {
    yield console.log(error);
  }
}

export function* reviewsWatcher() {
  yield takeLatest('reviews/getReviewsFetch', reviewsWorker);
}