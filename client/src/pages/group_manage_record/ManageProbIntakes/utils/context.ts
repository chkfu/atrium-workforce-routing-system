import { createContext, useContext } from 'react';
import { enum_gender, enum_prob_status } from '../../../../utils/types/page_enums';
import { IProbIntake } from '../../../../utils/types/redux_types';

interface IntakesContextType {
  //  1. GET
  //  1a. receive general data
  rawIntakes: IProbIntake[];
  setRawIntakes: React.Dispatch<React.SetStateAction<IProbIntake[]>>;
  selectedIntakes: number[];
  setSelectedIntakes: React.Dispatch<React.SetStateAction<number[]>>;
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
  setFilterProbStatus: React.Dispatch<React.SetStateAction<enum_prob_status | null>>;
  filterDept: string;
  setFilterDept: React.Dispatch<React.SetStateAction<string>>;
  filterStrategy: string;
  setFilterStrategy: React.Dispatch<React.SetStateAction<string>>;
  filterIsActive: boolean | null;
  setFilterIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
  filterCreatedFrom: string;
  setFilterCreatedFrom: React.Dispatch<React.SetStateAction<string>>;
  filterCreatedTo: string;
  setFilterCreatedTo: React.Dispatch<React.SetStateAction<string>>;
  filterUpdatedFrom: string;
  setFilterUpdatedFrom: React.Dispatch<React.SetStateAction<string>>;
  filterUpdatedTo: string;
  setFilterUpdatedTo: React.Dispatch<React.SetStateAction<string>>;
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
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IntakesContext = createContext<IntakesContextType | undefined>(undefined);

export const useIntakesContext = () => {
  const context = useContext(IntakesContext);
  if (!context) {
    throw new Error('[ManageIntakes] error: missing useContext at context provider.');
  }
  return context;
};
