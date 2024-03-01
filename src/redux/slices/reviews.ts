import { RootState } from '@redux/configure-store'
import { createSlice } from '@reduxjs/toolkit'

type ReviewsStatetype = {
  isLoading: boolean,
}

const initialState: ReviewsStatetype = {
  isLoading: false,
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    getReviewsFetch: (state) => {
      state.isLoading = true;
    },
    getReviewsSuccess: (state) => {
        state.isLoading = false;
    },
    getReviewsError: (state) => {
        state.isLoading = false;
    },
  }
})

export const reviewsSelect = (state: RootState) => state.reviews
export const {
  getReviewsFetch,
  getReviewsSuccess,
  getReviewsError,
} = reviewsSlice.actions
export const reviewsReducer = reviewsSlice.reducer;