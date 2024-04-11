import { call, put, takeLatest } from 'redux-saga/effects';
import { instance } from '@axios/axios';
import { getMyInvitationsFetch, getMyInvitationsSucces } from '@redux/slices/invite';
import { AxiosPaths } from '@typing/enums/axios-paths';

function* myInvitationsWorker() {
  const { data } = yield call(
    instance.get,
    AxiosPaths.INVITE,
  );

  yield put(getMyInvitationsSucces(data)); 
}

export function* myInvitationsWatcher() {
  yield takeLatest(getMyInvitationsFetch.type, myInvitationsWorker);
}