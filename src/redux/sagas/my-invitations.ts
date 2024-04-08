import { getMyInvitationsFetch } from '@redux/slices/invite';
import { takeLatest } from 'redux-saga/effects';

function* myInvitationsWorker() {
  yield
}

export function* myInvitationsWatcher() {
  yield takeLatest(getMyInvitationsFetch.type, myInvitationsWorker);
}