import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { MessageCalendarType } from '@typing/types/message-types';
import { TrainingType } from '@typing/types/response-types';

type TrainingListStateType = {
  isLoading: boolean,
  isError: boolean,
  trainingList: TrainingType[] | null,
  message: MessageCalendarType | null,
}

const initialState: TrainingListStateType = {
  isLoading: false,
  trainingList: null,
  message: null,
  isError: false,
}

export const trainingListSlice = createSlice({
  name: 'trainingList',
  initialState,
  reducers: {
    getTrainingListFetch: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    getTrainingListSuccess: (state, action: PayloadAction<TrainingType[]>) => {
      state.isLoading = false;
      state.trainingList = action.payload;
      state.isError = false;
    },
    getTrainingListError: (state, action: PayloadAction<MessageCalendarType>) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    },
    clearError: (state) => {
      state.message = null;
      state.isError = false;
    }
  }
});

export const trainingListReducer = trainingListSlice.reducer;
export const trainingListSelect = (state: RootState) => state.trainingList;
export const {
  getTrainingListFetch,
  getTrainingListSuccess,
  getTrainingListError,
  clearError,
} = trainingListSlice.actions;



