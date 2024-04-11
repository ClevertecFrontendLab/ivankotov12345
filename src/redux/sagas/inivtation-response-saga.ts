import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getInvitationResponseFetch, getInvitationResponseSuccess, getMyInvitationsFetch } from '@redux/slices/invite';
import { getPalsFetch } from '@redux/slices/joint-trainings';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { InvitationResponseType } from '@typing/types/user-joint-trainings-types';

function* invitationResponseWorker(action: PayloadAction<InvitationResponseType>) {
  yield call(
    instance.put,
    AxiosPaths.INVITE,
    action.payload,
  );
  yield put(getMyInvitationsFetch());
  yield put(getPalsFetch());
  yield put(getInvitationResponseSuccess());
}

export function* invitationResponseWatcher() {
  yield takeLatest(getInvitationResponseFetch.type, invitationResponseWorker);
}