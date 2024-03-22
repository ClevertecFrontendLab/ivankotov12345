import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { FeedbackValues } from '@typing/types/form-input-values';
import { MessageFeedbackType, MessageType } from '@typing/types/message-types';

type FeedbackStateType = {
  isLoading: boolean,
  isResult: boolean,
  submittedData?: FeedbackValues,
  message?: MessageType,
  messageError?: MessageFeedbackType,
  clearModalInputs?: boolean,
}

const initialState: FeedbackStateType = {
  isLoading: false,
  isResult: false,
  clearModalInputs: false,
}

export const sendFeedbackSlice = createSlice({
  name: 'sendFeedback',
  initialState,
  reducers: {
    getFeedbackFetch: (state, action: PayloadAction<FeedbackValues>) => {
      state.isLoading = true;
      state.isResult = false;
      state.submittedData = action.payload;
    },
    getFeedbackSuccess: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.isResult = true;
      state.message = action.payload;
      state.clearModalInputs = true;
    },
    getFeedbackError: (state, action: PayloadAction<MessageFeedbackType>) => {
      state.isLoading = false;
      state.isResult = true;
      state.messageError = action.payload;
    },
    clearFeedbackResult: (state) => {
      state.isLoading = false;
      state.isResult = false;
      state.message = undefined;
      state.messageError = undefined;
      state.clearModalInputs = false;
    },
    clearFeedbackInputs: (state) => {
      state.clearModalInputs = true;
    }
  }
})

export const sendFeedbackSelect = (state: RootState) => state.sendFeedback;
export const {
  getFeedbackFetch,
  getFeedbackSuccess,
  getFeedbackError,
  clearFeedbackResult,
  clearFeedbackInputs,
} = sendFeedbackSlice.actions;
export const sendFeedbackReducer = sendFeedbackSlice.reducer;