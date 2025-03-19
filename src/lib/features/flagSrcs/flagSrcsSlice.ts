import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Data_Url_Image } from '@/types/Currency';

export interface FlagSrcsState {
  src1: Data_Url_Image;
  src2: Data_Url_Image;
}

type changeFlagSrcPayload = PayloadAction<{
  idNumber: number;
  newSrc: Data_Url_Image;
}>;

const initialState: FlagSrcsState = {
  src1: process.env.NEXT_PUBLIC_defaultFlagSrc!,
  src2: process.env.NEXT_PUBLIC_defaultFlagSrc!,
};

export const flagSrcsSlice = createSlice({
  name: 'flagSrcs',
  initialState: initialState,
  reducers: {
    changeFlagSrc: (state, action: changeFlagSrcPayload) => {
      const idNumber = action.payload.idNumber;
      state[`src${idNumber}` as keyof FlagSrcsState] = action.payload.newSrc;
    },
    toggleFlagSrcs: (state) => {
      [state.src1, state.src2] = [state.src2, state.src1];
    },
  },
});

export const { changeFlagSrc, toggleFlagSrcs } = flagSrcsSlice.actions;

export default flagSrcsSlice.reducer;
