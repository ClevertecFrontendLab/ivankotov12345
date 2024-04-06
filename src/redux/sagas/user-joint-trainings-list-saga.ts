import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getUserJointTrainingsListFetch, getUserJointTrainingsListSuccess } from '@redux/slices/joint-trainings';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';

function* userJointTrainingListWorker(action: PayloadAction<string | null>) {
  try {
    const { data } = yield call(
      instance.get,
      AxiosPaths.USER_JOINT_TRAINING_LIST,
      { params: { trainingType: action.payload } } 
    );

    yield put(getUserJointTrainingsListSuccess(data));
  } catch(error) {
    yield
  }
}

export function* userJointTrainingListWatcher() {
  yield takeLatest(getUserJointTrainingsListFetch.type, userJointTrainingListWorker);
}