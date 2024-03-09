import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrainingType } from '@typing/types/response-types';

type TrainingListStateType = {
  isLoading: boolean,
  trainingList: TrainingType[] | null,
}

const initialState: TrainingListStateType = {
  isLoading: false,
  trainingList: null
}

export const trainingListSlice = createSlice({
  name: 'trainingList',
  initialState,
  reducers: {
    getTrainingListFetch: (state) => {
      state.isLoading = true;
    },
    getTrainingListSuccess: (state, action: PayloadAction<TrainingType[]>) => {
      state.isLoading = false;
      state.trainingList = action.payload;
    },
    getTrainingListError: (state) => {
      state.isLoading = false;
    },
  }
});

export const trainingListReducer = trainingListSlice.reducer;
export const trainingListSelect = (state: RootState) => state.trainingList;
export const {
  getTrainingListFetch,
  getTrainingListSuccess,
  getTrainingListError
} = trainingListSlice.actions;



