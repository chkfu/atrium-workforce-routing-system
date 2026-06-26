import { configureStore } from '@reduxjs/toolkit';
import candidate_reducer from './slices/CandidateSlice';
import staff_reducer from './slices/StaffSlice';
import department_reducer from './slices/DepartmentSlice';

export const store = configureStore({
  reducer: {
    candidates: candidate_reducer,
    staff: staff_reducer,
    department: department_reducer,
  },
});

// Get the type of our store variable

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
