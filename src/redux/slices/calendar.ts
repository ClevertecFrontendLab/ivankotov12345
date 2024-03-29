import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '@typing/types/message-types';
import { CalendarResponseItemType } from '@typing/types/response-types';

type CalendarStateType = {
  isLoading: boolean,
  isError: boolean,
  trainings: CalendarResponseItemType[] | null;
  message: MessageType | null,
}

const initialState: CalendarStateType = {
  isLoading: false,
  isError: false,
  trainings: null,
  message: null,
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
    clearCalendarError: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    }
  }
});

export const calendarSelect = (state: RootState) => state.calendar;
export const calendarErrorMessageSelect = (state: RootState) => state.calendar.message;
export const calendarReducer = calendarSlice.reducer;
export const {
  getCalendarFetch,
  getCalendarSuccess,
  getCalendarError,
  clearCalendarError
} = calendarSlice.actions;