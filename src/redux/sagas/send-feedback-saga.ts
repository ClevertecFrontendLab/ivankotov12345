import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { FeedbackValues } from '@typing/types/form-input-values';
import { instance } from '@axios/axios';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { getFeedbackSuccess } from '@redux/slices/send-feedback';
import { SendFeedbackSuccessMessage } from '@typing/enums/result-messages';


function* sendFeedBackWorker(action: PayloadAction<FeedbackValues>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.FEEDBACK,
      { ...action.payload }
    )
    yield put(getFeedbackSuccess({
      status: SendFeedbackSuccessMessage.status,
      title: SendFeedbackSuccessMessage.title,
      buttonText: SendFeedbackSuccessMessage.buttonText,
    }))
  } catch(error) {
    console.log(error)
  }
}

export function* sendFeedbackWatcher() {
  yield takeLatest('sendFeedback/getFeedbackFetch', sendFeedBackWorker);
}