import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICandidate, ICandidateList } from '../../utils/types/redux_types';

const initialState: ICandidateList = {
  value: [],
};

export const candidate_slice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<ICandidate[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCandidates } = candidate_slice.actions;

export default candidate_slice.reducer;
