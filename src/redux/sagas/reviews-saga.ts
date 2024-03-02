import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { getReviewsSuccess } from '@redux/slices/reviews';


function* reviewsWorker() {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.FEEDBACK,
    );
    yield put(getReviewsSuccess(data));
  } catch(error) {
    yield console.log(error);
  }
}

export function* reviewsWatcher() {
  yield takeLatest('reviews/getReviewsFetch', reviewsWorker);
}