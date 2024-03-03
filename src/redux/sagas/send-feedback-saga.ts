import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { FeedbackValues } from '@typing/types/form-input-values';
import { instance } from '@axios/axios';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { getFeedbackError, getFeedbackSuccess } from '@redux/slices/send-feedback';
import { SendFeedbackErrorMessage, SendFeedbackSuccessMessage } from '@typing/enums/result-messages';
import { Paths } from '@typing/enums/paths';


function* sendFeedBackWorker(action: PayloadAction<FeedbackValues>) {
  try {
    yield call(
      instance.post,
      AxiosPaths.FEEDBACK,
      { ...action.payload }
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