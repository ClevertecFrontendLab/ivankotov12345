import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { MessageCalendarType } from '@typing/types/message-types';
import { TrainingRequestType } from '@typing/types/request-types';

type RedactTrainingStateType = {
  isLoading: boolean,
  isError: boolean,
  isRedactingMode: boolean,
  trainingId: string | null,
  submittedData: TrainingRequestType | null,
  message: MessageCalendarType | null,
}

const initialState: RedactTrainingStateType = {
  isLoading: false,
  isError: false,
  isRedactingMode: false,
  trainingId: null,
  submittedData: null,
  message: null,
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
    getRedactTrainingError: (state, action: PayloadAction<MessageCalendarType>) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    },
    setIsRedactingMode: (state) => {
      state.isRedactingMode = true;
    },
    removeIsRedactTrainingMode: (state) => {
      state.isRedactingMode = false;
    },
    clearRedactingError: (state) => {
      state.message = null;
      state.isError = false;
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
  clearRedactingError
} = redactTrainingSlice.actions;
export const redactTrainingReducer = redactTrainingSlice.reducer;


