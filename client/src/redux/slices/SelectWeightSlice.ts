import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelectWeight, ISelectWeightList } from '../../utils/types/redux_types';

const initialState: ISelectWeightList = {
  value: [],
};

export const select_weight_slice = createSlice({
  name: 'sltweight',
  initialState,
  reducers: {
    setSelectWeight: (state, action: PayloadAction<ISelectWeight[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectWeight } = select_weight_slice.actions;

export default select_weight_slice.reducer;
