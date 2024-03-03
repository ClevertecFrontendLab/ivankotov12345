import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FeedbackValues } from '@typing/types/form-input-values';
import { RootState } from '@redux/configure-store';
import { MessageType } from '@typing/types/message-types';

type FeedbackStateType = {
  isLoading: boolean,
  submittedData?: FeedbackValues,
  message?: MessageType,
}

const initialState: FeedbackStateType = {
  isLoading: false,
}

export const sendFeedbackSlice = createSlice({
  name: 'sendFeedback',
  initialState,
  reducers: {
    getFeedbackFetch: (state, action: PayloadAction<FeedbackValues>) => {
      state.isLoading = true;
      state.submittedData = action.payload;
    },
    getFeedbackSuccess: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    getFeedbackError: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.message = action.payload;
    }
  }
})

export const sendFeedbackSelect = (state: RootState) => state.sendFeedback;
export const {
  getFeedbackFetch,
  getFeedbackSuccess,
  getFeedbackError
} = sendFeedbackSlice.actions;
export const sendFeedbackReducer = sendFeedbackSlice.reducer;