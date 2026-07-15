import { createContext, useContext, Context, Dispatch, SetStateAction } from 'react';

//  remarks: types
interface SelectCriteriaType {
  targetSltCriteria: any,
  setTargetSltCriteria: Dispatch<SetStateAction<any>>;
}

//  remarks: contexts
export const SltCriteriaContext = createContext<SelectCriteriaType | undefined>(undefined);


//  remarks: reusable customised context hook
export const useProfileDeptContext = <T>(sect_name: string, sect_context: Context<T>) => {
  const context = useContext(sect_context);
  if (!context) {
    throw new Error(
      `[ProfileDepartment] error: missing useContext at context provider - ${sect_name}.`
    );
  }
  return context;
};
