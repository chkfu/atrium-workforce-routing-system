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
  //  SEARCH, FILTER and PAGINATION
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  filtered: boolean;
  setFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  //  SORTING
  sortTarget: string;
  setSortTarget: React.Dispatch<React.SetStateAction<string>>;
  sortAsc: boolean;
  setSortAsc: React.Dispatch<React.SetStateAction<boolean>>;
  triggerSort: boolean;
  setTriggerSort: React.Dispatch<React.SetStateAction<boolean>>;
  //  PAGINATION
  totalPage: number;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  //  LOADING
  isInitialised: boolean;
  setIsInitialised: React.Dispatch<React.SetStateAction<boolean>>;
  isGetting: boolean;
  setIsGetting: React.Dispatch<React.SetStateAction<boolean>>;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  isConverting: boolean;
  setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
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
