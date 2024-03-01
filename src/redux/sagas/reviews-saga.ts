import { takeLatest } from "redux-saga/effects"

function* reviewsWorker() {
  yield
}

export function* reviewsWatcher() {
  yield takeLatest('reviews/getReviewsFetch', reviewsWorker);
}