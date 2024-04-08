import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { ExerciseType } from '@typing/types/exercise-types';
import { MessageCalendarType } from '@typing/types/message-types';
import { TrainingRequestType } from '@typing/types/request-types';
import { CalendarResponseItemType } from '@typing/types/response-types';

type CreatetrainingStateType = {
  isLoading: boolean,
  submittedData: TrainingRequestType | null,
  createdTraining: CalendarResponseItemType | null,
  exercises: ExerciseType[],
  isModalTrainingsOpen: boolean,
  selectedTraining: string | null,
  message: MessageCalendarType | null,
  isError: boolean,
  repeat: boolean,
  period: number | null,
}

const initialState: CreatetrainingStateType = {
  isLoading: false,
  submittedData: null,
  createdTraining: null,
  exercises: [],
  isModalTrainingsOpen: false,
  selectedTraining: null,
  message: null,
  isError: false,
  repeat: false,
  period: null,
}

export const createTrainingSlice = createSlice({
  name: 'createTraining',
  initialState,
  reducers: {
    getCreateTrainingFetch: (state, action: PayloadAction<TrainingRequestType>) => {
      state.isLoading = true;
      state.submittedData = action.payload;
    },
    getCreateTrainingSuccess: (state, action: PayloadAction<CalendarResponseItemType>) => {
      state.isLoading = false;
      state.isModalTrainingsOpen = false;
      state.createdTraining = action.payload;
    },
    getCreateTrainingError: (state, action: PayloadAction<MessageCalendarType>) => {
      state.isLoading = false;
      state.isModalTrainingsOpen = false;
      state.message = action.payload;
      state.isError = true;
    },
    setExercisesList: (state, action: PayloadAction<ExerciseType[]>) => {
      state.exercises = action.payload;
    },
    setSelectedTraining: (state, action: PayloadAction<string | null>) => {
      state.selectedTraining = action.payload;
    },
    clearExercisesList: (state) => {
      state.exercises = [];
      state.selectedTraining = null;
    },
    openCreateTrainingModal: (state) => {
      state.isModalTrainingsOpen = true;
    },
    closeCreateTrainingModal: (state) => {
      state.isModalTrainingsOpen = false;
    },
    clearCreateTrainingError: (state) => {
      state.isError = false;
      state.message = null;
    },
  }
});

export const createTrainingSelect = (state: RootState) => state.createTraining;

export const createTrainingReducer = createTrainingSlice.reducer;
export const {
  getCreateTrainingFetch,
  getCreateTrainingSuccess,
  getCreateTrainingError,
  setExercisesList,
  setSelectedTraining,
  clearExercisesList,
  openCreateTrainingModal,
  closeCreateTrainingModal,
  clearCreateTrainingError,
} = createTrainingSlice.actions;