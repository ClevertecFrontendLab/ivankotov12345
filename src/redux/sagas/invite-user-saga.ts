import { call, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getSendInviteFetch } from '@redux/slices/invite';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosPaths } from '@typing/enums/axios-paths';
import { InviteType } from '@typing/types/user-joint-trainings-types';

function* inviteUserWorker(action: PayloadAction<InviteType>) {
  yield call(
    instance.post,
    AxiosPaths.INVITE,
    action.payload
  )
}

export function* inviteUserWatcher() {
  yield takeLatest(getSendInviteFetch.type, inviteUserWorker);
}