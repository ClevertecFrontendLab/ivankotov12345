import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { InviteType } from '@typing/types/user-joint-trainings-types';

type InviteTrainingStateType = {
  isLoading: boolean,
  submittedData: InviteType | null,
  inviteUserId: string | null,
}

const initialState: InviteTrainingStateType = {
  isLoading: false,
  submittedData: null,
  inviteUserId: null,
}

export const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    setInviteUserId: (state, action: PayloadAction<string | null>) => {
      state.inviteUserId = action.payload;
    },
    getSendInviteFetch: (state, action: PayloadAction<InviteType>) => {
      state.isLoading = true;
      state.submittedData = action.payload
    },
    getSendInviteSuccess: (state) => {
      state.isLoading = false;
    },
    getSendInviteError: (state) => {
      state.isLoading = false;
    },
    getMyInvitationsFetch: (state) => {
      state.isLoading = true
    },
    getMyInvitationsSucces: (state) => {
      state.isLoading = false;
    },
    getMyInvitationsError: (state) => {
      state.isLoading = false;
    }
  }
});

export const inviteSelect = (state: RootState) => state.invite;
export const inviteUserIdSelect = (state: RootState) => state.invite.inviteUserId;

export const inviteReducer = inviteSlice.reducer;
export const {
  setInviteUserId,
  getSendInviteFetch,
  getSendInviteSuccess,
  getSendInviteError,
  getMyInvitationsFetch,
  getMyInvitationsSucces,
  getMyInvitationsError,
} = inviteSlice.actions;