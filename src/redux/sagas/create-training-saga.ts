import { call, put, select, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getCalendarFetch } from '@redux/slices/calendar';
import {
  getCreateTrainingError,
  getCreateTrainingFetch,
  getCreateTrainingSuccess
} from '@redux/slices/create-training';
import { getSendInviteFetch, inviteUserIdSelect } from '@redux/slices/invite';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { GetModalCalendarError } from '@typing/enums/result-messages';
import { TrainingRequestType } from '@typing/types/request-types';
import { CalendarResponseItemType } from '@typing/types/response-types';
import { AxiosResponse } from 'axios';

function* createTrainingWorker(action: PayloadAction<TrainingRequestType>) {
  try {
    const { data }: AxiosResponse<CalendarResponseItemType> = yield call(
      instance.post,
      AxiosPaths.TRAINING,
      action.payload,
    )

    yield put(getCreateTrainingSuccess(data));
    const invitedUserId: string | null = yield select(inviteUserIdSelect);

    if(invitedUserId) {
      yield put(getSendInviteFetch({
        to: invitedUserId,
        trainingId: data._id
      }))
    }

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