import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { UserJointTrainingsType } from '@typing/types/user-joint-trainings-types';

type JointTrainingStateType = {
  isLoading: boolean,
  pals: UserJointTrainingsType[],
  userJointTrainingsList: UserJointTrainingsType[],
  trainingType: string | null,
}

const initialState: JointTrainingStateType = {
  isLoading: false,
  pals: [],
  userJointTrainingsList: [],
  trainingType: null,
}

export const jointTrainingSlice = createSlice({
  name: 'jointTrainings',
  initialState,
  reducers: {
    getPalsFetch: (state) => {
      state.isLoading = true;
    },
    getPalsSuccess: (state, action: PayloadAction<UserJointTrainingsType[]>) => {
      state.isLoading = false;
      state.pals = action.payload;
    },
    getPalsError: (state) => {
      state.isLoading = false;
    },
    getUserJointTrainingsListFetch: (state, action: PayloadAction<string | null>) => {
      state.isLoading = true;
      state.trainingType = action.payload
    },
    getUserJointTrainingsListSuccess: (state, action: PayloadAction<UserJointTrainingsType[]>) => {
      state.isLoading = false;
      state.userJointTrainingsList = action.payload;
    },
    getUserJointTrainingsListError: (state) => {
      state.isLoading = false;
    },
    clearUsersJointTrainingsList: (state) => {
      state.userJointTrainingsList = [];
    }
  }
});

export const jointTrainingsSelect = (state: RootState) => state.jointTrainings;
export const jointTrainingsReducer = jointTrainingSlice.reducer;
export const {
  getPalsFetch,
  getPalsSuccess,
  getPalsError,
  getUserJointTrainingsListFetch,
  getUserJointTrainingsListSuccess,
  getUserJointTrainingsListError,
  clearUsersJointTrainingsList,
} = jointTrainingSlice.actions;
