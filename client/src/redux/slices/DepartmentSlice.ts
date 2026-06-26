import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDepartment, IDepartmentList } from '../../utils/types/redux_types';

const initialState: IDepartmentList = {
  value: [],
};

export const department_slice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartment: (state, action: PayloadAction<IDepartment[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setDepartment } = department_slice.actions;

export default department_slice.reducer;
