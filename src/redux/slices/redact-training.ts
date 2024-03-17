import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@redux/configure-store';
import { TrainingRequestType } from '@typing/types/request-types';

type RedactTrainingStateType = {
  isLoading: boolean,
  isRedactingMode: boolean,
  trainingId: string | null,
  submittedData: TrainingRequestType | null,
}

const initialState: RedactTrainingStateType = {
  isLoading: false,
  isRedactingMode: false,
  trainingId: null,
  submittedData: null,
}

export const redactTrainingSlice = createSlice({
  name: 'redactTraining',
  initialState,
  reducers: {
    setSelectedTrainingId: (state, action: PayloadAction<string>) => {
      state.trainingId = action.payload;
    },
    getRedactTrainingFetch: (state, action: PayloadAction<TrainingRequestType>) => {
      state.isLoading = true;
      state.submittedData = action.payload;
    },
    getRedactTrainingSuccess: (state) => {
      state.isLoading = false;
    },
    getRedactTrainingError: (state) => {
      state.isLoading = false;
    },
    setIsRedactingMode: (state) => {
      state.isRedactingMode = true;
    },
    removeIsRedactTrainingMode: (state) => {
      state.isRedactingMode = false;
    }
  }
});

export const redactTrainingSelect = (state: RootState) => state.redactTraining;
export const trainingIdSelect = (state: RootState) => state.redactTraining.trainingId;
export const {
  getRedactTrainingFetch,
  getRedactTrainingSuccess,
  getRedactTrainingError,
  setIsRedactingMode,
  setSelectedTrainingId,
  removeIsRedactTrainingMode,
} = redactTrainingSlice.actions;
export const redactTrainingReducer = redactTrainingSlice.reducer;


