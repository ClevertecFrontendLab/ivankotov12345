import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { InvitationResponseType, InviteType, MyInvitationsType } from '@typing/types/user-joint-trainings-types';

type InviteTrainingStateType = {
  isLoading: boolean,
  submittedData: InviteType | null,
  inviteUserId: string | null,
  responseData: MyInvitationsType[],
  invitationResponse?: InvitationResponseType,
  idToDelete?: string,
}

const initialState: InviteTrainingStateType = {
  isLoading: false,
  submittedData: null,
  inviteUserId: null,
  responseData: [],
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
      state.submittedData = action.payload;
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
    getMyInvitationsSucces: (state, action: PayloadAction<MyInvitationsType[]>) => {
      state.isLoading = false;
      state.responseData = action.payload;
    },
    getMyInvitationsError: (state) => {
      state.isLoading = false;
    },
    getInvitationResponseFetch: (state, action: PayloadAction<InvitationResponseType>) => {
      state.isLoading = true;
      state.invitationResponse = action.payload;
    },
    getInvitationResponseSuccess: (state) => {
      state.isLoading = false;
    },
    getInvitationResponseError: (state) => {
      state.isLoading = false;
    },
    getDeleteInvitationFetch: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.idToDelete = action.payload;
    },
    getDeleteInvitationSuccess: (state) => {
      state.isLoading = false;
    },
    getDeleteInvitationError: (state) => {
      state.isLoading = false;
    },
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
  getInvitationResponseFetch,
  getInvitationResponseSuccess,
  getInvitationResponseError,
  getDeleteInvitationFetch,
  getDeleteInvitationSuccess,
  getDeleteInvitationError,
} = inviteSlice.actions;