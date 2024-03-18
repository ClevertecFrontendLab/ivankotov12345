import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MessageType } from '@typing/types/message-types';
import { CalendarResponseItemType } from '@typing/types/response-types';

type CalendarStateType = {
  isLoading: boolean,
  isError: boolean,
  trainings: CalendarResponseItemType[] | null;
  message?: MessageType,
}

const initialState: CalendarStateType = {
  isLoading: false,
  isError: false,
  trainings: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    getCalendarFetch: (state) => {
      state.isLoading = true;
    },
    getCalendarSuccess: (state, action: PayloadAction<CalendarResponseItemType[]>) => {
      state.isLoading = false;
      state.isError = false;
      state.trainings = action.payload;
    },
    getCalendarError: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  }
});

export const calendarSelect = (state: RootState) => state.calendar;
export const calendarErrorMessageSelect = (state: RootState) => state.calendar.message;
export const calendarReducer = calendarSlice.reducer;
export const { getCalendarFetch, getCalendarSuccess, getCalendarError } = calendarSlice.actions;