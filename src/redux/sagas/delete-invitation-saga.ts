import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getDeleteInvitationFetch } from '@redux/slices/invite';
import { getPalsFetch } from '@redux/slices/joint-trainings';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';

function* deleteInvitationWorker(action: PayloadAction<string>) {
  yield call(
    instance.delete,
    `${AxiosPaths.INVITE}/${action.payload}`,
  )
  yield put(getPalsFetch());
}

export function* deleteInvitationWatcher() {
  yield takeLatest(getDeleteInvitationFetch.type, deleteInvitationWorker);
}