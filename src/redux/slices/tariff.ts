import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { PayTariffRequestType } from '@typing/types/request-types';
import { TariffListType } from '@typing/types/tariff-types';

type TariffStateType = {
  isLoading: boolean,
  tariffList: TariffListType[] | null,
  payTariffData: PayTariffRequestType | null,
  isSuccess: boolean,
}

const initialState: TariffStateType = {
  isLoading: false,
  tariffList: null,
  payTariffData: null,
  isSuccess: false,
}

export const tariffSlice = createSlice({
  name: 'tariff',
  initialState,
  reducers: {
    getTariffListFetch: (state) => {
      state.isLoading = true;
    },
    getTariffListSuccss: (state, action: PayloadAction<TariffListType[]>) => {
      state.isLoading = false;
      state.tariffList = action.payload;
    },
    getTariffListError: (state) => {
      state.isLoading = false;
    },
    getPayTariffFetch: (state, action: PayloadAction<PayTariffRequestType>) => {
      state.isLoading = true;
      state.payTariffData = action.payload;
    },
    getPayTariffSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    getPayTariffError: (state) => {
      state.isLoading = false;
    },
    clearTariff: (state) => {
      state.tariffList = null;
      state.payTariffData = null;
      state.isSuccess = false;
    }
  }
});

export const tariffReducer = tariffSlice.reducer;
export const tariffSelect = (state: RootState) => state.tariff;
export const {
  getTariffListFetch,
  getTariffListSuccss,
  getTariffListError,
  getPayTariffFetch,
  getPayTariffSuccess,
  getPayTariffError,
  clearTariff,
} = tariffSlice.actions;