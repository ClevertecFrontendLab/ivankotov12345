import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getCalendarFetch } from '@redux/slices/calendar';
import {
  getCreateTrainingError,
  getCreateTrainingFetch,
  getCreateTrainingSuccess
} from '@redux/slices/create-training';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { GetModalCalendarError } from '@typing/enums/result-messages';
import { TrainingRequestType } from '@typing/types/request-types';

function* createTrainingWorker(action: PayloadAction<TrainingRequestType>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.TRAINING,
      action.payload,
    )
    yield put(getCreateTrainingSuccess());
    yield put(getCalendarFetch());
  } catch(error) {
    yield put(getCreateTrainingError({
      error: GetModalCalendarError.status,
      title: GetModalCalendarError.title,
      text: GetModalCalendarError.text,
      buttonText: GetModalCalendarError.buttonText,
    }));
  }

}

export function* createTrainingWatcher() {
  yield takeLatest(getCreateTrainingFetch.type, createTrainingWorker);
}