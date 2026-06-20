import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStaff, IStaffList } from '../../utils/types/redux_types'

const initialState: IStaffList = {
  value: []
}

export const staff_slice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<IStaff[]>) => {
      state.value = action.payload
    },
  }
})

export const { setStaff } = staff_slice.actions

export default staff_slice.reducer