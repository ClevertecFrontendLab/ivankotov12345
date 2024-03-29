import { call, put, select, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getCalendarFetch } from '@redux/slices/calendar';
import {
  getRedactTrainingError,
  getRedactTrainingFetch,
  getRedactTrainingSuccess,
  trainingIdSelect } from '@redux/slices/redact-training';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { GetModalCalendarError } from '@typing/enums/result-messages';
import { ExerciseType } from '@typing/types/exercise-types';

function* redactTrainingWorker(action: PayloadAction<ExerciseType[]>) {
  try {
    const id: string = yield select(trainingIdSelect);

    yield call(
      instance.put,
      `${AxiosPaths.TRAINING}/${id}`,
      action.payload
    );
    yield put(getRedactTrainingSuccess());
    yield put(getCalendarFetch());
  } catch(error) {
    yield put(getRedactTrainingError({
      error: GetModalCalendarError.status,
      title: GetModalCalendarError.title,
      text: GetModalCalendarError.text,
      buttonText: GetModalCalendarError.buttonText,
    }));
  }
}

export function* redactTrainingWatcher() {
  yield takeLatest(getRedactTrainingFetch.type, redactTrainingWorker);
}