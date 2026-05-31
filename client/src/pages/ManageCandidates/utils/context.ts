import { createContext, useContext } from 'react';

interface CandidateContextType {
  //  GET
  candidates: any[];
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>;
  selectedCandidates: number[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
  //  POST
  triggerCreate: boolean;
  setTriggerCreate: React.Dispatch<React.SetStateAction<boolean>>;
  //  PATCH
  triggerUpdate: boolean;
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  updateDetails: any;
  setUpdateDetails: React.Dispatch<React.SetStateAction<any>>;
  convertStatus: boolean | null;
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  triggerConvert: boolean;
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>;
  //  OTHERS
  isGetting: boolean;
  setIsGetting: React.Dispatch<React.SetStateAction<boolean>>;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  isConverting: boolean;
  setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const CandidateContext = createContext<CandidateContextType | undefined>(
  undefined,
);

export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error(
      '[ManageCandidates] error: missing useContext at context provider.',
    );
  }
  return context;
};
