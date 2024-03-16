import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExerciseType } from '@typing/types/exercise-types';
import { TrainingRequestType } from '@typing/types/request-types';

type CreatetrainingStateType = {
  isLoading: boolean,
  submittedData: TrainingRequestType | null,
  exercises: ExerciseType[],
  isModalTrainingsOpen: boolean,
  selectedTraining: string | null,
}

const initialState: CreatetrainingStateType = {
  isLoading: false,
  submittedData: null,
  exercises: [],
  isModalTrainingsOpen: false,
  selectedTraining: null,
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
    setSelectedTraining: (state, action: PayloadAction<string>) => {
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
  setSelectedTraining,
  clearExercisesList,
  openCreateTrainingModal,
  closeCreateTrainingModal,
} = createTrainingSlice.actions;