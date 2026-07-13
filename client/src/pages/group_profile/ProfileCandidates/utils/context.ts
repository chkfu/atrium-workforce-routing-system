import { createContext, useContext, Context, Dispatch, SetStateAction } from 'react';

//  remarks: types
interface CandidateEduType {
  targetCandidateEdu: any;
  setTargetCandidateEdu: Dispatch<SetStateAction<any>>;
}
interface CandidateExpType {
  targetCandidateExp: any;
  setTargetCandidateExp: Dispatch<SetStateAction<any>>;
}
interface CandidateTestType {
  targetCandidateTest: any;
  setTargetCandidateTest: Dispatch<SetStateAction<any>>;
}
interface CandidatePrefType {
  targetCandidatePref: any;
  setTargetCandidatePref: Dispatch<SetStateAction<any>>;
}

//  remarks: contexts
export const CandidateEduContext = createContext<CandidateEduType | undefined>(undefined);
export const CandidateExpContext = createContext<CandidateExpType | undefined>(undefined);
export const CandidateTestContext = createContext<CandidateTestType | undefined>(undefined);
export const CandidatePrefContext = createContext<CandidatePrefType | undefined>(undefined);

//  remarks: reusable customised context hook
export const useProfileCandidateContext = <T>(sect_name: string, sect_context: Context<T>) => {
  const context = useContext(sect_context);
  if (!context) {
    throw new Error(
      `[ProfileCandidates] error: missing useContext at context provider - ${sect_name}.`
    );
  }
  return context;
};
