import { takeLatest } from 'redux-saga/effects';
import { getMyInvitationsFetch } from '@redux/slices/invite';

function* myInvitationsWorker() {
  yield
}

export function* myInvitationsWatcher() {
  yield takeLatest(getMyInvitationsFetch.type, myInvitationsWorker);
}