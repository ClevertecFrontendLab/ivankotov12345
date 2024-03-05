import { RootState } from '@redux/configure-store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MessageType } from '@typing/types/message-types'
import { FeedbackResponseType } from '@typing/types/response-types'

type ReviewsStatetype = {
  isLoading: boolean,
  isError: boolean,
  feedbacks: FeedbackResponseType[] | null,
  message?: MessageType,
}

const initialState: ReviewsStatetype = {
  isLoading: false,
  isError: false,
  feedbacks: null
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    getReviewsFetch: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.feedbacks = null;
    },
    getReviewsSuccess: (state, action: PayloadAction<FeedbackResponseType[]>) => {
        state.isLoading = false;
        state.isError = false;
        state.feedbacks = action.payload;
    },
    getReviewsError: (state, action: PayloadAction<MessageType>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    },
    clearError: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.message = undefined;
    }
  }
})

export const reviewsSelect = (state: RootState) => state.reviews
export const {
  getReviewsFetch,
  getReviewsSuccess,
  getReviewsError,
  clearError,
} = reviewsSlice.actions
export const reviewsReducer = reviewsSlice.reducer;