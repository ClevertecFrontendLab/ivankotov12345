import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getFeedbackError, getFeedbackSuccess } from '@redux/slices/send-feedback';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { Paths } from '@typing/enums/paths';
import { SendFeedbackErrorMessage, SendFeedbackSuccessMessage } from '@typing/enums/result-messages';
import { FeedbackValues } from '@typing/types/form-input-values';


function* sendFeedBackWorker(action: PayloadAction<FeedbackValues>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.FEEDBACK,
      action.payload
    );
    yield put(getFeedbackSuccess({
      status: SendFeedbackSuccessMessage.status,
      title: SendFeedbackSuccessMessage.title,
      buttonText: SendFeedbackSuccessMessage.buttonText,
      buttonLink: Paths.FEEDBACKS,
    }));
  } catch(error) {
    yield put(getFeedbackError({
      status: SendFeedbackErrorMessage.status,
      title: SendFeedbackErrorMessage.title,
      subTitle: SendFeedbackErrorMessage.subTitle,
      buttonTextWriteMessage: SendFeedbackErrorMessage.buttonTextWriteMessage,
      buttonTextClose: SendFeedbackErrorMessage.buttonTextClose
    }));
  }
}

export function* sendFeedbackWatcher() {
  yield takeLatest('sendFeedback/getFeedbackFetch', sendFeedBackWorker);
}