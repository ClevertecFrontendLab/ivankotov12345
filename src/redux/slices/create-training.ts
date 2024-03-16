import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExerciseType } from '@typing/types/exercise-types';
import { TrainingRequestType } from '@typing/types/request-types';

type CreatetrainingStateType = {
  isLoading: boolean,
  submittedData: TrainingRequestType | null,
  exercises: ExerciseType[],
  isModalTrainingsOpen: boolean,
}

const initialState: CreatetrainingStateType = {
  isLoading: false,
  submittedData: null,
  exercises: [],
  isModalTrainingsOpen: false,
}

export const createTrainingSlice = createSlice({
  name: 'createTraining',
  initialState,
  reducers: {
    getCreateTrainingFetch: (state, action: PayloadAction<TrainingRequestType>) => {
      state.isLoading = true;
      state.submittedData = action.payload;
    },
    getCreateTrainingSuccess: (state) => {
      state.isLoading = false;
      state.isModalTrainingsOpen = false;
    },
    getCreateTrainingError: (state) => {
      state.isLoading = false;
      state.isModalTrainingsOpen = false;
    },
    setExercisesList: (state, action: PayloadAction<ExerciseType[]>) => {
      state.exercises = action.payload;
    },
    clearExercisesList: (state) => {
      state.exercises = []
    },
    openCreateTrainingModal: (state) => {
      state.isModalTrainingsOpen = true;
    },
    closeCreateTrainingModal: (state) => {
      state.isModalTrainingsOpen = false;
    }
  }
});

export const createTrainingSelect = (state: RootState) => state.createTraining;
export const createTrainingReducer = createTrainingSlice.reducer;
export const {
  getCreateTrainingFetch,
  getCreateTrainingSuccess,
  getCreateTrainingError,
  setExercisesList,
  clearExercisesList,
  openCreateTrainingModal,
  closeCreateTrainingModal,
} = createTrainingSlice.actions;