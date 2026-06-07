import { createContext, useContext } from 'react';
import { enum_gender, enum_prob_status } from './types';

interface CandidateContextType {
  //  1. GET
  //  1a. receive general data
  candidates: any[];
  setCandidates: React.Dispatch<React.SetStateAction<any[]>>;
  selectedCandidates: number[];
  setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
  //  1b. receive pagination data
  totalPage: number;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  //  1c. receive sorted data
  sortTarget: string;
  setSortTarget: React.Dispatch<React.SetStateAction<string>>;
  sortAsc: boolean;
  setSortAsc: React.Dispatch<React.SetStateAction<boolean>>;
  triggerSort: boolean;
  setTriggerSort: React.Dispatch<React.SetStateAction<boolean>>;
  //  1d. receive filtered data
  triggerFilter: boolean;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;
  filterEmail: string;
  setFilterEmail: React.Dispatch<React.SetStateAction<string>>;
  filterGender: enum_gender | null;
  setFilterGender: React.Dispatch<React.SetStateAction<enum_gender | null>>;
  filterProbStatus: enum_prob_status | null;
  setFilterProbStatus: React.Dispatch<
    React.SetStateAction<enum_prob_status | null>
  >;
  filterIsActive: boolean | null;
  setFilterIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
  filterCreatedAtStart: string;
  setFilterCreatedAtStart: React.Dispatch<React.SetStateAction<string>>;
  filterCreatedAtEnd: string;
  setFilterCreatedAtEnd: React.Dispatch<React.SetStateAction<string>>;
  //  2. POST
  //  2a. create new records
  triggerCreate: boolean;
  setTriggerCreate: React.Dispatch<React.SetStateAction<boolean>>;

  //  3. PATCH
  //  3a. update general details
  updateDetails: any;
  setUpdateDetails: React.Dispatch<React.SetStateAction<any>>;
  triggerUpdate: boolean;
  setTriggerUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  //  3b. update active status
  convertStatus: boolean | null;
  setConvertStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  triggerConvert: boolean;
  setTriggerConvert: React.Dispatch<React.SetStateAction<boolean>>;

  //  4. TEMP STATE
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
